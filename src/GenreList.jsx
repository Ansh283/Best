
// GenreList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GenreList.css";

const API_KEY = "3010af69085e10c657c5e302d82c06b8";
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(GENRE_API_URL)
      .then((response) => response.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  return (
    <div className="genre-list-container p-4">
      <h2 className="text-xl font-bold mb-4">Select a Genre</h2>
      <div className="genre-buttons flex flex-wrap gap-4 justify-center">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
            className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenreList;