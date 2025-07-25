import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./config";
import "./MovieDetails.css";

const API_KEY = "3010af69085e10c657c5e302d82c06b8";
const API_URL = "https://api.themoviedb.org/3/movie/";
const BACKEND_URL = `${API_BASE_URL}/reviews`;


function MovieDetails() {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [watchProviders, setWatchProviders] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const userId = decoded.id;
  const userName = decoded.name;

  // Fetch movie details from TMDb
  useEffect(() => {
    if (!movieId) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}${movieId}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    })();
  }, [movieId]);

  // Fetch TMDb reviews
  useEffect(() => {
    if (!movieId) return;
    axios
      .get(`${API_URL}${movieId}/reviews?api_key=${API_KEY}`)
      .then((res) => setTmdbReviews(res.data.results || []))
      .catch((err) => console.error("Error fetching TMDb reviews:", err));
  }, [movieId]);

  // Fetch streaming platforms from TMDb
  useEffect(() => {
    if (!movieId) return;
    axios
      .get(`${API_URL}${movieId}/watch/providers?api_key=${API_KEY}`)
      .then((res) => {
        const providers =
          res.data.results?.IN?.flatrate || res.data.results?.US?.flatrate || [];
        setWatchProviders(providers);
      })
      .catch((err) => console.error("Error fetching streaming platforms:", err));
  }, [movieId]);

  // Fetch reviews function
  const fetchReviews = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.data || error);
    }
  };

  // Initial fetch of backend reviews
  useEffect(() => {
    fetchReviews();
  }, [movieId, token]);

  // Fetch watchlist IDs to prevent duplicates
  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API_BASE_URL}/watchlist/ids`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWatchlistIds(res.data || []))
      .catch((err) => console.error("Error fetching watchlist IDs:", err));
  }, [token]);

  // Save to Watchlist with duplication check
  const saveToWatchlist = async () => {
    if (!token) {
      alert("You must be logged in to add movies to the watchlist.");
      return;
    }

    if (watchlistIds.includes(Number(movieId))) {
      alert("This movie is already in your watchlist!");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/watchlist/add`,
        { movieId: movie.id, title: movie.title, poster: movie.poster_path },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message || "Movie added to Watchlist!");
      setWatchlistIds((prev) => [...prev, Number(movieId)]);
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This movie is already in your watchlist!");
      } else {
        console.error("Error adding to watchlist:", error.response?.data || error);
        alert("Could not add movie. Please try again later.");
      }
    }
  };

  // Add Review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to add a review.");
      return;
    }
    try {
      await axios.post(
        `${API_BASE_URL}`,
        { movieId, rating, review: reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating("");
      setReviewText("");
      // Re-fetch reviews to get user name populated
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error.response?.data || error);
    }
  };

  // Delete Review
  const deleteReview = async (reviewId) => {
    if (!token) {
      alert("Please log in to delete your review!");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error.response?.data || error);
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <div className="detailsButtons">
        <Link to="/" className="back-button">
          ⬅ Back to Home
        </Link>
        <button
          className="saveToWatchlist"
          onClick={saveToWatchlist}
          disabled={watchlistIds.includes(Number(movieId))}
        >
          {watchlistIds.includes(Number(movieId))
            ? "In Watchlist"
            : "Save to Watchlist"}
        </button>
      </div>

      <div className="details-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="details-image"
        />
        <div className="details-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} ⭐
          </p>
          <p>
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>{movie.overview}</p>

          {/* Streaming Platforms Section */}
          <h3>Available On:</h3>
          {watchProviders.length > 0 ? (
            <div className="watch-providers">
              {watchProviders.map((provider) => (
                <div key={provider.provider_id} className="provider">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                  <p>{provider.provider_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Not available for streaming in your region.</p>
          )}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="add-review">
        <h3>Add a Review</h3>
        <form onSubmit={handleAddReview}>
          <input
            type="number"
            placeholder="Rating (1-10)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            required
          />
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>User Reviews</h3>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review">
              <p>{review.review}</p>
              <p>
                <strong>Rating:</strong> {review.rating} ⭐
              </p>
              <p>
                <strong>By:</strong> {review.user?.name || "Unknown"}
              </p>
              {review.user?._id === userId && (
                <button onClick={() => deleteReview(review._id)}>
                  🗑 Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Display TMDb Reviews */}
      <div className="reviews-section">
        <h3>TMDb Reviews</h3>
        {tmdbReviews.length > 0 ? (
          tmdbReviews.map((review) => (
            <div key={review.id} className="review">
              <p>{review.content}</p>
              <p>
                <strong>Author:</strong> {review.author}
              </p>
            </div>
          ))
        ) : (
          <p>No critic reviews available from TMDb.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;