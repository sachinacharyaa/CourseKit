const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { Usermodel, Purchasemodel, Coursemodel } = require("../db");

const courseRouter = Router();


//prefix already added in index.js "/course
courseRouter.post("/purchase",userMiddleware, async function(req, res){
     // Extract userId from the request object, which was set by the userMiddleware
    const userId = req.userId;

    // Extract courseId from the request body sent by the client
    const courseId = req.body.courseId;

    // If courseId is not provided in the request body, return a 400 error response to the client
    if (!courseId) {
        return res.status(400).json({
            message: "Please provide a courseId", // Error message sent back to the client
        });
    }

    // Check if the user has already purchased the course by querying the purchaseModel with courseId and userId
    const existingPurchase = await Purchasemodel.findOne({
        courseId: courseId,
        userId: userId,
    });

    // If the user has already purchased the course, return a 400 error response to the client
    if (existingPurchase) {
        return res.status(400).json({
            message: "You have already bought this course",
        });
    }

    // Try to create a new purchase entry in the database with the provided courseId and userId
    await Purchasemodel.create({
        courseId: courseId, // The ID of the course being purchased
        userId: userId,     // The ID of the user making the purchase
    });

    // If the purchase is successful, return a 201 status with a success message to the client
    res.status(201).json({
        message: "You have successfully bought the course", // Success message after purchase
    });
});

//to see all courses available to you
courseRouter.post("/preview", userMiddleware, async function(req, res){
 // Query the database to get all the courses available for purchase
    const courses = await Coursemodel.find({});

    // Return the queried course details as a JSON response to the client with a 200 status code
    res.status(200).json({
        courses: courses, // Send the course details back to the client
    });
})


module.exports = {
    courseRouter,
}