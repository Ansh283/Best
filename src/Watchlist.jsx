import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./config";
import "./Watchlist.css";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  // Fetch watchlist from backend
  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to login...");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/watchlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(res.data); // Assuming API returns an array of movie objects
      } catch (error) {
        console.error("Error fetching watchlist:", error.response?.data || error);
      }
    };

    fetchWatchlist();
  }, [token]);

  // Remove movie from watchlist
  const handleRemove = async (movieId) => {
    if (!token) return;
    try {
      await axios.delete(`${API_BASE_URL}/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local state to remove the movie
      setWatchlist((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error("Error removing movie:", error.response?.data || error);
    }
  };

  // Filter watchlist by search query
  const filteredMovies = watchlist.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">Your Watchlist</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search in Watchlist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="watchlist-search"
      />

      <div className="watchlist-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.movieId} className="watchlist-item">
              <Link to={`/movie/${movie.movieId}`} className="watchlist-link">
                <div className="watchlist-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.title}
                    className="watchlist-image"
                  />
                  <h2 className="watchlist-name">{movie.title}</h2>
                </div>
              </Link>
              <button
                className="remove-btn"
                onClick={() => handleRemove(movie.movieId)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;