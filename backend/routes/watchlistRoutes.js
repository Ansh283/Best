const express = require("express");
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getWatchlist);  // ✅ Fetch user's watchlist
router.post("/add", authMiddleware, addToWatchlist);  // ✅ Add movie to watchlist
router.delete("/:movieId", authMiddleware, removeFromWatchlist);  // ✅ Remove from watchlist

module.exports = router;
