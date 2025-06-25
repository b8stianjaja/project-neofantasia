import React from 'react';
import { useCart } from '../../context/CartContext';
import './BeatListItem.css';

const BeatListItem = ({ beat, isPlaying, isSelected, onPlay, onPause, onSelect }) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === beat.id);

  const handleAddToCart = (e) => { e.stopPropagation(); addToCart(beat); };

  const Waveform = () => (
    <div className="waveform">
      <style>{`.waveform{display:flex;align-items:flex-end;height:16px;gap:2px}.waveform-bar{width:3px;background-color:#1DB954;animation:wave 1.2s infinite ease-in-out}@keyframes wave{0%,100%{height:2px}50%{height:16px}}.waveform-bar:nth-child(2){animation-delay:-1s}.waveform-bar:nth-child(3){animation-delay:-.8s}.waveform-bar:nth-child(4){animation-delay:-.6s}`}</style>
      <div className="waveform-bar"></div><div className="waveform-bar"></div><div className="waveform-bar"></div><div className="waveform-bar"></div>
    </div>
  );

  const beatName = beat.title || beat.name;
  const itemClasses = `beat-list-item ${isPlaying ? 'playing' : ''} ${isSelected ? 'selected' : ''}`;

  return (
    <div className={itemClasses} onClick={onSelect}>
      <div
        className="item-play-status"
        onClick={(e) => {
          e.stopPropagation();
          // THE FIX: Conditionally call the correct function
          if (isPlaying) {
            onPause();
          } else {
            onPlay();
          }
        }}
      >
        {isPlaying ? <Waveform /> : <span className="play-icon">▶</span>}
      </div>
      <div className="item-title-container">
        <img src={beat.artwork} alt={beatName} className="item-image" />
        <span className="item-title">{beatName}</span>
      </div>
      <span className="item-bpm">{beat.bpm}</span>
      <span className="item-key">{beat.key || "N/A"}</span>
      <span className="item-price">${beat.price.toFixed(2)}</span>
      <div className="item-cart-action">
        <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={isInCart}>
          {isInCart ? '✓' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default BeatListItem;