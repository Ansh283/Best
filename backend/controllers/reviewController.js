const Review = require("../models/reviewModel");

// Add a review for a movie
const addReview = async (req, res) => {
  try {
    console.log("User from middleware:", req.user); // Debug log
    
    const { movieId, rating, review } = req.body;
    const userId = req.user.id; // Ensure your auth middleware attaches req.user

    // Create and save new review
    const newReview = new Review({
      user: userId,
      movieId,
      rating,
      review,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a movie
const getReviewsForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movieId }).populate("user", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review (only if the review belongs to the user)
const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const userId = req.user.id;
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      // Check if the review belongs to the user
      if (review.user.toString() !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this review" });
      }
  
      // Use deleteOne() instead of remove()
      await review.deleteOne();
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { addReview, getReviewsForMovie, deleteReview };
