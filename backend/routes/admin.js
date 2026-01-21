const { Router } = require("express");
const AdminRouter = Router();
// Import adminModel from db.js
const { Adminmodel, Coursemodel } = require("../db");
const jwt = require("jsonwebtoken")
const zod = require("zod");
//imported
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
AdminRouter.post("/signup", async function (req, res) {
    const { email, password, firstname, lastname } = req.body;
    //hashed the pass, so that wll stored in db

    //if error comes in empassfnamlastname, it doesnot crash, it notify the user
    try {
        await Adminmodel.create({
            email,
            password,
            FirstName: firstname,
            LastName: lastname,
        });

        res.json({
            message: "User signed up successfully",
        });
    } catch (err) {
        res.status(400).json({
            message: "User already exists or invalid data",
        });
    }
})

AdminRouter.post("/signin", async function (req, res) {
    ///// here we are 
    const { email, password } = req.body;

    //todo: password should be hashed, and hence you cant compare the user and provided password and the database password(bcrypt)
    //if error comes in empassfnamlastname, it doesnot crash, it notify the user
    const admin = await Adminmodel.findOne({
        email,
        password,

    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id,
        }, JWT_ADMIN_PASSWORD);

        // do cookie logic

        res.json({
            token: token
        })
    } else {
        res.json({
            message: "incorrect credentials"
        })
    }



})
// create course
AdminRouter.post("/create", adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const { title, description, imageURL, price } = req.body;

    try {
        const course = await Coursemodel.create({
            title, description, imageURL, price, creatorId: adminId
        });

        res.json({
            message: "Course created",
            courseId: course._id
        });
    } catch (err) {
        res.status(400).json({
            message: "Failed to create course",
            error: err.message
        });
    }
})

//updating 
AdminRouter.post("/edit", adminMiddleware, async function (req, res) {

    const adminId = req.userId;
    // Define a schema using zod to validate the request body for updating a course
    const requireBody = zod.object({
        courseId: zod.string().min(5), // Ensure course ID is at least 5 characters
        title: zod.string().min(3).optional(), // Title is optional
        description: zod.string().min(5).optional(), // Description is optional
        imageURL: zod.string().optional(), // Image URL is optional (removed .url() to be more lenient with long proxied URLs)
        price: zod.number().positive().optional(), // Price is optional
    });

    // Parse and validate the incoming request body against the schema
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    // If validation fails, respond with an error message and the details of the error
    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data format", // Inform the client about the error
            error: parseDataWithSuccess.error, // Provide specific validation error details
        });
    }

    // Destructure the validated fields from the request body
    const { courseId, title, description, imageURL, price } = req.body;

    // Attempt to find the course in the database using the provided courseId and adminId
    const course = await Coursemodel.findOne({
        _id: courseId, // Match the course by ID
        creatorId: adminId, // Ensure the admin is the creator
    });

    // If the course is not found, respond with an error message
    if (!course) {
        return res.status(404).json({
            message: "Course not found!", // Inform the client that the specified course does not exist
        });
    }

    // Update the course details in the database using the updates object
    await Coursemodel.updateOne(
        {
            _id: courseId, // Match the course by ID
            creatorId: adminId, // Ensure the admin is the creator
        },
        {
            title: title || course.title, // Update title if provided, otherwise keep the existing title
            description: description || course.description, // Update description if provided, otherwise keep the existing description
            imageURL: imageURL || course.imageURL, // Update imageURL if provided, otherwise keep the existing imageURL
            price: price || course.price, // Update price if provided, otherwise keep the existing price
        }
    );

    // Respond with a success message upon successful course update
    res.status(200).json({
        message: "Course updated!", // Confirm successful course update
    });
})
AdminRouter.post("/delete", adminMiddleware, async function (req, res) {
    // Get the adminId from the request object
    const adminId = req.userId;

    // Validate the request body data using zod schema (courseId must be valid)
    const requireBody = zod.object({
        courseId: zod.string().min(5), // Course ID must be at least 5 characters
    });

    // Parse and validate the request body data
    const parseDataWithSuccess = requireBody.safeParse(req.body);

    // If the data format is incorrect, send an error message to the client
    if (!parseDataWithSuccess.success) {
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    // Get courseId from the request body
    const { courseId } = req.body;

    // Find the course with the given courseId and creatorId
    const course = await Coursemodel.findOne({
        _id: courseId,
        creatorId: adminId,
    });

    // If the course is not found, send an error message to the client
    if (!course) {
        return res.status(404).json({
            message: "Course not found!",
        });
    }

    // Delete the course with the given courseId and creatorId
    await Coursemodel.deleteOne({
        _id: courseId,
        creatorId: adminId,
    });

    // Respond with a success message if the course is deleted successfully
    res.status(200).json({
        message: "Course deleted!",
    });
});


AdminRouter.post("/course/bulk", adminMiddleware, async function (req, res) {
    // Get the adminId from the request object
    const adminId = req.userId;

    // Find all courses with the given creatorId
    const courses = await Coursemodel.find({
        creatorId: adminId,
    });

    // Respond with the courses if they are found successfully
    res.status(200).json({
        courses: courses,
    });
});


module.exports = {
    AdminRouter,
}