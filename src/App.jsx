import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import GenreList from "./GenreList";
import GenreMovies from "./GenreMovies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Watchlist from "./Watchlist";
import Navbar from "./Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />

        {/* Genre Routes */}
        <Route path="/genres" element={<GenreList />} />
        <Route path="/genre/:genreId/:genreName" element={<GenreMovies />} />  {/* ✅ Improved Route */}
      </Routes>
      </>
  );
}

export default App;
