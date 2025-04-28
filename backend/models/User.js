const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  poster: { type: String }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [WatchlistSchema]  // ✅ Embed watchlist inside User
});

module.exports = mongoose.model("User", UserSchema);
