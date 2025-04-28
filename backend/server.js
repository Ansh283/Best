const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const reviewRoutes = require("./routes/reviewRoutes");


dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/reviews", reviewRoutes); // Mount review routes

// Connect to MongoDB
connectDB();

// Simple Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
