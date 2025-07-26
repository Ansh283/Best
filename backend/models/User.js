const mongoose = require("mongoose");
const crypto = require("crypto")

const WatchlistSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String }

  
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [WatchlistSchema] ,// ✅ Embed watchlist inside User

   resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Utility to generate reset token
UserSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return token;
};

module.exports = mongoose.model("User", UserSchema);
