import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="dialogue-box">
        <h1 className="home-title">Welcome to BeatForge</h1>
        <p className="home-subtitle">Your journey into sound begins here. Explore a universe of high-quality instrumentals crafted for creators like you.</p>
        <div className="home-cta">
          <Link to="/beats" className="crystal-button">
            <span>[ Start Exploring ]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;