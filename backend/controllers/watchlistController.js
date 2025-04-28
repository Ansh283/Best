const User = require("../models/User");

const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");  // ✅ Populate watchlist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.watchlist);  // ✅ Send watchlist movies as response
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ message: "Error fetching watchlist" });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the movie is already in the watchlist
    if (user.watchlist.some((movie) => movie.movieId === movieId)) {
      return res.status(400).json({ message: "Movie is already in the watchlist" });
    }

    user.watchlist.push({ movieId, title, poster });  // ✅ Add movie to watchlist array
    await user.save();

    res.json({ message: "Movie added to watchlist!", watchlist: user.watchlist });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ message: "Error adding to watchlist" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchlist = user.watchlist.filter(movie => movie.movieId !== req.params.movieId);
    await user.save();

    res.json({ message: "Movie removed from watchlist", watchlist: user.watchlist });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    res.status(500).json({ message: "Error removing from watchlist" });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
