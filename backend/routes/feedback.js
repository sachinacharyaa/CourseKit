const { Router } = require("express");
const { Feedbackmodel } = require("../db");

const feedbackRouter = Router();

// POST /feedback - Submit feedback (no authentication required)
feedbackRouter.post("/", async function (req, res) {
    try {
        const { message, email } = req.body;

        // Validate required field
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Feedback message is required"
            });
        }

        // Validate message length
        if (message.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Feedback message must be less than 2000 characters"
            });
        }

        // Validate email format if provided
        if (email && email.trim().length > 0) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid email address"
                });
            }
        }

        // Create feedback entry
        const feedback = await Feedbackmodel.create({
            message: message.trim(),
            email: email ? email.trim() : undefined,
            createdAt: new Date()
        });

        res.status(201).json({
            success: true,
            message: "Thank you for your feedback!",
            feedbackId: feedback._id
        });

    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit feedback. Please try again."
        });
    }
});

module.exports = {
    feedbackRouter,
};
