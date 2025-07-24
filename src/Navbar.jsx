import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
        
          <h2 className="logo">MovieNerds</h2>
          {/* <div className="search-container">
            <input
              type="text"
              placeholder="🔍"
              onChange={handleSearch}
              className="search-bar"
            />
          </div> */}
        </div>

        {/* === Hamburger Button === */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={menuOpen ? "bar open" : "bar"}></div>
          <div className={menuOpen ? "bar open" : "bar"}></div>
          <div className={menuOpen ? "bar open" : "bar"}></div>
        </div>

        {/* === Nav Links === */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/watchlist" onClick={() => setMenuOpen(false)}>Watchlist</Link></li>
          <li><Link to="/genres" onClick={() => setMenuOpen(false)}>Genres</Link></li>

          {token ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <li><Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" className="register-btn" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
