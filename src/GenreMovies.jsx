// GenreMovies.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GenreMovies.css";

const API_KEY = "3010af69085e10c657c5e302d82c06b8";
const DISCOVER_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

function GenreMovies() {
  const { genreId, genreName } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!genreId) return;
    const url = `${DISCOVER_API_URL}&with_genres=${genreId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies by genre:", err));
  }, [genreId]);

  return (
    <div className="genre-movies-container">
      <h2>Movies in {decodeURIComponent(genreName)}</h2>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="title">{movie.title}</p>
            </Link>
          ))
        ) : (
          <p>No movies found for this genre.</p>
        )}
      </div>
    </div>
  );
}

export default GenreMovies;