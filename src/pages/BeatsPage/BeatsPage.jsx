import React from 'react';
import { beats } from '../../entities/beat/beats';
import BeatCard from '../../entities/beat/BeatCard';
import './BeatsPage.css';

function BeatsPage() {
  // We need to calculate a dynamic height for the parallax group
  // to ensure all beats are displayed as the user scrolls.
  const groupHeight = 100 + (beats.length * 40); // Base vh + extra vh per beat

  return (
    <div className="beats-page-container">
      <div className="parallax">

        {/* Layer 1: Background */}
        <div className="parallax__group" style={{ height: `${groupHeight}vh` }}>
          <div className="parallax__layer parallax__layer--back"></div>

          {/* Layer 2: Base Layer (for titles, etc.) */}
          <div className="parallax__layer parallax__layer--base">
            <h1 className="beats-page-title">Discover the Soundscape</h1>
          </div>

          {/* Layer 3: Foreground (interactive beat elements) */}
          <div className="parallax__layer parallax__layer--fore">
            {beats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default BeatsPage;