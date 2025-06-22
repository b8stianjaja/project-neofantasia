import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">BeatForge</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/beats" className="nav-link">Beats</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;