const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    token = token.replace("Bearer ", ""); // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from DB (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach full user object to req.user

    console.log("Authenticated User:", req.user); // Debugging log

    next(); // Continue to next middleware or route handler
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;


