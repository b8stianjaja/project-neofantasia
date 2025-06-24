import React, { useState, useContext } from 'react';
import './BeatCard.css';
import { CartContext } from '../../context/CartContext';
import { MusicContext } from '../../context/MusicContext';

function BeatCard({ beat }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { playTrack, currentTrack, isPlaying } = useContext(MusicContext);

  const isCurrentlyPlaying = currentTrack?.id === beat.id && isPlaying;

  const handleCardClick = () => {
    // Toggle play/pause
    playTrack(beat);

    // Also toggle the expanded view for details
    setIsExpanded(!isExpanded);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent the card click from firing again
    addToCart(beat);
    console.log(`Added ${beat.title} to cart`);
  };

  // Dynamically apply a class if the card is expanded
  const cardClassName = `beat-card ${isExpanded ? 'expanded' : ''}`;

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      <img src={beat.artwork} alt={beat.title} className="beat-artwork" />

      <div className="beat-info-overlay">
        <h3 className="beat-title">{beat.title}</h3>
        <p className="beat-price">${beat.price}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BeatCard;