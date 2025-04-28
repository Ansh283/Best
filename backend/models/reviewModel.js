const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: String, required: true },
  rating: { type: Number, required: true }, // e.g., 1 to 10 or 1 to 5 scale
  review: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);
