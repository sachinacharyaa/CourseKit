const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    try {
        const token = authHeader.split(" ")[1]; // Remove "Bearer " prefix
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "You are not signed in"
            });
        }
    } catch (e) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}
module.exports = {
    userMiddleware,
}