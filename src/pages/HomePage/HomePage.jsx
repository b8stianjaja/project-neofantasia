// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="title-screen-container">
      <div className="title-logo-wrapper">
        <h1 className="title-logo">BeatForge</h1>
      </div>

      <nav className="bottom-menu-nav">
        <Link to="/beats" className="bottom-menu-button">Begin</Link>
        <div className="menu-separator"></div>
        <Link to="/cart" className="bottom-menu-button disabled">Cart</Link>
        <div className="menu-separator"></div>
        <Link to="/contact" className="bottom-menu-button">Contact</Link>
      </nav>
    </div>
  );
};

export default HomePage;