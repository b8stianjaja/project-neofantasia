import React from 'react';
import './BeatCard.css';

function BeatCard({ beat }) {
  return (
    <div className="beat-card">
      <img src={beat.image} alt={beat.title} className="beat-image" />
      <div className="beat-info">
        <h3 className="beat-title">{beat.title}</h3>
        <p className="beat-details">{beat.bpm} BPM | {beat.key}</p>
        <div className="beat-actions">
          <button className="play-button">▶</button>
          <p className="beat-price">${beat.price}</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default BeatCard;