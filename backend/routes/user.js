const { Router } = require("express");
const { Usermodel, Purchasemodel, Coursemodel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname } = req.body;
  //hashed the pass, so that wll stored in db

  //if error comes in empassfnamlastname, it doesnot crash, it notify the user
  try {
    await Usermodel.create({
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
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  //todo: password should be hashed, and hence you cant compare the user and provided password and the database password(bcrypt)
  //if error comes in empassfnamlastname, it doesnot crash, it notify the user
  const user = await Usermodel.findOne({
    email,
    password,

  });

  if (user) {
    const token = jwt.sign({
      id: user._id,
    }, JWT_USER_PASSWORD);

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

//show my all course purchases
userRouter.get("/purchases", userMiddleware, async function (req, res) {

  // Get the userId from the request object set by the userMiddleware
  const userId = req.userId;

  // Find all purchase records associated with the authenticated userId
  const purchases = await Purchasemodel.find({
    userId: userId, // Querying purchases by user ID
  });

  // If no purchases are found, return a 404 error response to the client
  if (!purchases) {
    return res.status(404).json({
      message: "No purchases found", // Error message for no purchases found
    });
  }

  // If purchases are found, extract the courseIds from the found purchases
  let purchasesCourseIds = [];

  for (let i = 0; i < purchases.length; i++) {
    purchasesCourseIds.push(purchases[i].courseId)
  }
  // const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

  // Find all course details associated with the courseIds
  const coursesData = await Coursemodel.find({
    _id: { $in: purchasesCourseIds }, // Querying courses using the extracted course IDs
  });

  // Send the purchases and corresponding course details back to the client
  res.status(200).json({
    purchases, // Include purchase data in the response
    coursesData, // Include course details in the response
  });
});



module.exports = {
  userRouter,
}