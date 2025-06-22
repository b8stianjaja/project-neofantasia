// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  // A simple function for a hover sound effect (optional)
  const playHoverSound = () => {
    // new Audio('/sounds/ui-hover.wav').play();
  };

  return (
    <div className="home-container">
      <div className="home-logo">
        <h1>neofantasia</h1>
      </div>
      <nav className="home-menu">
        <NavLink 
          to="/beats" 
          className="home-menu-item"
          onMouseEnter={playHoverSound}
        >
          Library
        </NavLink>
        <NavLink 
          to="/cart" 
          className="home-menu-item"
          onMouseEnter={playHoverSound}
        >
          Cart
        </NavLink>
        <NavLink 
          to="/contact" 
          className="home-menu-item"
          onMouseEnter={playHoverSound}
        >
          Contact
        </NavLink>
      </nav>
    </div>
  );
};

export default HomePage;