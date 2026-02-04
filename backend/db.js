const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Serverless-safe MongoDB connection with caching
// Use global variable to persist connection across serverless function invocations
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // Return existing connection if available
    if (cached.conn) {
        console.log("Using existing MongoDB connection");
        return cached.conn;
    }

    // If no connection promise exists, create one
    if (!cached.promise) {
        const MONGO_URL = process.env.MONGO_URL;
        
        if (!MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined");
        }

        // MongoDB connection options optimized for serverless
        const options = {
            bufferCommands: false, // Disable buffering for serverless
            maxPoolSize: 10, // Limit connections for serverless
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        console.log("Creating new MongoDB connection");
        cached.promise = mongoose.connect(MONGO_URL, options).then((mongoose) => {
            console.log("Connected to MongoDB");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Reset promise on error to allow retry
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }

    return cached.conn;
};

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

// Feedback schema for collecting user opinions
const feedbackSchema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Usermodel = mongoose.model("user", userSchema);
const Adminmodel = mongoose.model("admin", adminSchema);
const Coursemodel = mongoose.model("course", courseSchema);
const Purchasemodel = mongoose.model("purchase", purchaseSchema);
const Feedbackmodel = mongoose.model("feedback", feedbackSchema);

// Export models to be used in other files
module.exports = {
    connectDB,
    Usermodel,
    Adminmodel,
    Coursemodel,
    Purchasemodel,
    Feedbackmodel,
};