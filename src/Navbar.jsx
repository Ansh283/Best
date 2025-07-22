import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-gif">
          <img height={58} width={110} src="/movie-projector-film-projector.gif"></img>
      <h2 className="logo">CINEMAAN</h2>
      </div>
      <div></div>
      
      <ul className="nav-links">
       
       <li><input
          type="text"
          placeholder="🔍"
          onChange={handleSearch}
          className="search-bar"
        /></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li>
        <li><Link to="/genres">Genres</Link></li> 
        
        {token ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <li><Link to="/login" className="login-btn">Login</Link></li>
            <li><Link to="/register" className="register-btn">Register</Link></li>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
}

export default Navbar;
