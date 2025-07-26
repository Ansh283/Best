import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const API_KEY = "3010af69085e10c657c5e302d82c06b8";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function Home({ setSearchQuery, searchQuery }) {
  const [movies, setMovies] = useState([]);

  // ✅ Use the prop version only!
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const url = searchQuery ? `${SEARCH_URL}${searchQuery}` : TRENDING_URL;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="movie-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍"
          onChange={handleSearch}
          value={searchQuery}  // ✅ add value binding!
          className="search-bar"
        />
      </div>
      <h1 className="movie-title">{searchQuery ? "Search Results" : "Trending Movies"}</h1>
      <div className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-image"
                />
                <h2 className="movie-name">{movie.title}</h2>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
