const express = require("express");
const router = express.Router();
const { addReview, getReviewsForMovie, deleteReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to add a review (protected)
router.post("/", authMiddleware, addReview);

// Route to get reviews for a movie
router.get("/:movieId", getReviewsForMovie);

// Route to delete a review (protected)
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
