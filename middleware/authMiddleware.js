const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract only the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        console.log("Decoded Token:", decoded); 

        req.user = decoded; // Store user details in req.user
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticateUser;
