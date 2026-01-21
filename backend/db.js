const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema comes from mongoose.schema
const ObjectId = mongoose.Types.ObjectId;

//when you have to create connection to mongoDb, pass url
//if you have already created cluster,  now connect , copy the url
//in compass, paste as in new connection and repalace pass with previous once you created and add in mongoose.connect
//new database,
//in index.js

const userSchema = new Schema({ //schema is a class so, new
    email: { type: String, unique: true }, // these cant to reach two same email to DB
    password: String,
    FirstName: String,
    LastName: String
})

const adminSchema = new Schema({
    email: { type: String, unique: true }, // these cant to reach two same email to DB
    password: String,
    FirstName: String,
    LastName: String

})


const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: ObjectId
})

// Which user purchased which course?
const purchaseSchema = new Schema({
    courseId: ObjectId, //refers to above cousrseSchema
    userId: ObjectId   // this refers to userSchema

    // So it only needs:

    // Who bought it → userId
    // What was bought → courseId
    // That’s it.
})

const Usermodel = mongoose.model("user", userSchema);
const Adminmodel = mongoose.model("admin", adminSchema);
const Coursemodel = mongoose.model("course", courseSchema);
const Purchasemodel = mongoose.model("purchase", purchaseSchema);

// Export the userModel, adminModel, courseModel, and purchaseModel to be used in other files
module.exports = {
    Usermodel,
    Adminmodel,
    Coursemodel,
    Purchasemodel,
};