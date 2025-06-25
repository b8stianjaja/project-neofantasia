import React, { useState, useRef } from 'react';
import { useMusic } from '../../context/MusicContext';
import { useCart } from '../../context/CartContext';
import './BeatCard.css';

function BeatCard({ beat, cardIndex, totalCards, isActive }) {
  const { playTrack, currentTrack, isPlaying } = useMusic();
  const { addToCart } = useCart();
  const cardRef = useRef(null);
  const [dynamicStyle, setDynamicStyle] = useState({});

  const isThisBeatPlaying = currentTrack?.id === beat.id && isPlaying;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playTrack(beat);
  };
  
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(beat);
  };

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 15;
    const y = -(clientY - top - height / 2) / 15;
    setDynamicStyle({ transform: `scale(1.05) rotateY(${x}deg) rotateX(${y}deg)` });
  };

  const handleMouseLeave = () => {
    setDynamicStyle({ transform: 'scale(1) rotateY(0deg) rotateX(0deg)' });
  };

  const angle = (360 / totalCards) * cardIndex;
  const radius = '450px';

  return (
    <div 
      ref={cardRef}
      className="beat-card"
      data-active={isActive}
      style={{
        '--card-angle': `${angle}deg`,
        '--radius': radius,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="card-inner-wrapper" 
        style={{ 
          transform: isActive ? dynamicStyle.transform : undefined,
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
    </div>
  );
}

export default BeatCard;