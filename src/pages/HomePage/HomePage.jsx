import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to BeatForge</h1>
        <p className="home-subtitle">The ultimate destination for high-quality beats.</p>
        <div className="home-cta">
          <Link to="/beats" className="crystal-button">
            <span>Explore Beats</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;