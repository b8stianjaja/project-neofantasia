import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext'; // Import useCart
import './BeatCard.css';

function BeatCard({ beat }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { addToCart, cartItems } = useCart(); // Get addToCart function and cartItems

  const isInCart = cartItems.some(item => item.id === beat.id);

  const togglePlay = (e) => {
    e.stopPropagation(); // Prevent card click when clicking button
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(beat);
  }

  return (
    <div className="beat-card">
      <div className="beat-image-container">
        <img src={beat.image} alt={beat.title} className="beat-image" />
        <div className="beat-overlay" onClick={togglePlay}>
          <button className="play-button">
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      </div>
      <div className="beat-info-main">
        <h3 className="beat-title">{beat.title}</h3>
        <div className="beat-stats">
          <span>BPM: {beat.bpm}</span>
          <span>KEY: {beat.key}</span>
        </div>
        <div className="beat-actions">
          <p className="beat-price">${beat.price.toFixed(2)}</p>
          <button 
            className="crystal-button add-to-cart-button"
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <audio ref={audioRef} src={beat.audioSrc} loop onEnded={() => setIsPlaying(false)} />
    </div>
  );
}

export default BeatCard;