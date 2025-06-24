import React from 'react';
import { useMusic } from '../../context/MusicContext';
import { useCart } from '../../context/CartContext';
import './BeatCard.css';

function BeatCard({ beat, offset }) {
  const { playTrack, currentTrack, isPlaying } = useMusic();
  const { addToCart } = useCart();

  const isThisBeatPlaying = currentTrack?.id === beat.id && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playTrack(beat);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(beat);
  };

  // The card is only active and clickable if it's in the center
  const isActive = offset === 0;

  return (
    <div 
      className="beat-card"
      data-active={isActive}
      style={{
        '--offset': offset,
        'pointerEvents': isActive ? 'auto' : 'none'
      }}
    >
      <div className="artwork-container">
        <img src={beat.artwork} alt={beat.title} className="beat-artwork" />
        <div className="artwork-overlay">
          <button className="play-button" onClick={handlePlayClick}>
            <span className="play-icon">{isThisBeatPlaying ? '❚❚' : '▶'}</span>
          </button>
        </div>
      </div>
      <div className="beat-info">
        <h3 className="beat-title">{beat.title}</h3>
        <div className="beat-purchase-info">
          <span className="beat-price">${beat.price}</span>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeatCard;