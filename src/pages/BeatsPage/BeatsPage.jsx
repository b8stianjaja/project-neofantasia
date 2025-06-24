import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import beats from '../../entities/beat/beats';
import BeatCard from '../../entities/beat/BeatCard';
import './BeatsPage.css';

function BeatsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? beats.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === beats.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <main className="beats-page-container">
      <div className="background-glow"></div>
      
      <div className="carousel-wrapper">
        <div className="carousel-deck">
          {beats.map((beat, i) => {
            const offset = i - activeIndex;
            return (
              <BeatCard key={beat.id} beat={beat} offset={offset} />
            );
          })}
        </div>
      </div>

      <div className="carousel-navigation">
        <button className="nav-button prev-button" onClick={handlePrev}>
          &lt;
        </button>
        <button className="nav-button next-button" onClick={handleNext}>
          &gt;
        </button>
      </div>

      <footer className="beats-page-footer">
        <NavLink to="/" className="back-link">
          &larr; Back to Menu
        </NavLink>
      </footer>
    </main>
  );
}

export default BeatsPage;