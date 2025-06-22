import React, { useState, useRef } from 'react';
import './BeatCard.css';

function BeatCard({ beat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="beat-card">
      <div className="beat-image-container">
        <img src={beat.image} alt={beat.title} className="beat-image" />
        <div className="beat-overlay">
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      </div>
      <div className="beat-info">
        <h3 className="beat-title">{beat.title}</h3>
        <div className="beat-stats">
          <span>BPM: {beat.bpm}</span>
          <span>KEY: {beat.key}</span>
        </div>
        <div className="beat-actions">
          <p className="beat-price">${beat.price}</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <audio ref={audioRef} src={beat.audioSrc} loop onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

export default BeatCard;