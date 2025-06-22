// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    // NOTE: Consider adding a simple sound effect on click here
    // const playClickSound = () => new Audio('/path/to/click.mp3').play();

  return (
    <nav className="navbar" /*onClick={playClickSound}*/>
      <div className="nav-logo-container">
        <Link to="/" className="nav-logo">BeatForge</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">[ Main Hub ]</Link>
        <Link to="/beats" className="nav-link">[ Sound Library ]</Link>
        <Link to="/contact" className="nav-link">[ Broadcast ]</Link>
      </div>
    </nav>
  );
};

export default Navbar;