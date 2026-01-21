require('dotenv').config()
// console.log(process.env.MONGO_URL)
const express = require("express")
const cors = require("cors")
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
app.use(cors())
app.use(express.json())


const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { AdminRouter } = require("./routes/admin")




// here, user is prefix for user.js
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.use("/admin", AdminRouter);


//is this true ?? and in mongobd do i have to create manaullay database with its schema , i have all in route admin.js/course.js/user.js
//these will ensure,  first when mongoose.connect ( can took some time to ) successed then backend runs
//if error in mongoose, throws a error
//onlyy start if, database is up

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
             console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

main();
