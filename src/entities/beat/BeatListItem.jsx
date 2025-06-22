// src/entities/beat/BeatListItem.jsx
import React, { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; // Assuming you still want cart functionality
import './BeatListItem.css';

const BeatListItem = ({ beat, isPlaying, onPlay }) => {
  const audioRef = useRef(null);
  const { addToCart, cartItems } = useCart(); // Uncomment this line
  const isInCart = cartItems.some(item => item.id === beat.id); // Uncomment this line

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Rewind on pause
    }
  }, [isPlaying]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the row from playing when clicking cart
    addToCart(beat); // Uncomment this line
    console.log('Added to cart:', beat.title); // Placeholder
  };
  
  // A simple waveform animation for the playing track
  const Waveform = () => (
    <div className="waveform">
      <div className="waveform-bar"></div>
      <div className="waveform-bar"></div>
      <div className="waveform-bar"></div>
      <div className="waveform-bar"></div>
    </div>
  );

  return (
    <div 
      className={`beat-list-item ${isPlaying ? 'playing' : ''}`}
      onClick={() => onPlay(isPlaying ? null : beat.id)}
    >
      <div className="item-play-status">
        {isPlaying ? <Waveform /> : <span className="play-icon">▶</span>}
      </div>
      <div className="item-title-container">
        <img src={beat.image} alt={beat.title} className="item-image" />
        <span className="item-title">{beat.title}</span>
      </div>
      <span className="item-bpm">{beat.bpm}</span>
      <span className="item-key">{beat.key}</span>
      <span className="item-price">${beat.price.toFixed(2)}</span>
      <div className="item-cart-action">
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
          disabled={isInCart} // Uncomment this line
        >
          {isInCart ? '✓' : '+'} {/* Uncomment this line */}
        </button>
      </div>
      <audio ref={audioRef} src={beat.audioSrc} loop />
    </div>
  );
};

export default BeatListItem;