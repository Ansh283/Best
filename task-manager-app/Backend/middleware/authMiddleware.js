const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

    try {
        // Verify the token with your JWT secret
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token payload:", verifiedUser);
        // Attach the decoded user information (typically containing userId) to req.user
        req.user = verifiedUser;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ error: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
