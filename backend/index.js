// Load environment variables first (must be at the very top)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();

// CORS configuration for production and development
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://course-kit-frontend.vercel.app",
    "https://coursekit.vercel.app",
    process.env.FRONTEND_URL, // Allow custom frontend URL from env
].filter(Boolean); // Remove undefined values

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB (serverless-safe with caching)
connectDB();

// Import route handlers
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { AdminRouter } = require("./routes/admin");

// Route handlers
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", AdminRouter);

// Root endpoint
app.get("/", (req, res) => {
    res.json({ 
        status: "ok",
        message: "CourseKit Backend is running",
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint for deployment verification
app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy",
        service: "CourseKit API",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        status: "error",
        message: "Route not found" 
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ 
        status: "error",
        message: "Internal server error" 
    });
});

// Export the Express app for Vercel serverless
module.exports = app;

