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
      <h2 className="logo">MovieNerds</h2>
      <input
          type="text"
          placeholder="Explore !"
          onChange={handleSearch}
          className="search-bar"
        />
      <ul className="nav-links">
       
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
    </nav>
  );
}

export default Navbar;
