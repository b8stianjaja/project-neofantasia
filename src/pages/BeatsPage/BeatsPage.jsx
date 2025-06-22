// src/pages/BeatsPage/BeatsPage.jsx
import React, { useState } from 'react';
import { beats } from '../../entities/beat/beats';
import BeatListItem from '../../entities/beat/BeatListItem'; // NEW component
import './BeatsPage.css';

const BeatsPage = () => {
  const [nowPlaying, setNowPlaying] = useState(null);

  const handlePlay = (beatId) => {
    setNowPlaying(beatId);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Sound Library</h1>
      <div className="beat-list-container">
        <div className="beat-list-header">
          <span className="header-play"></span>
          <span className="header-title">TITLE</span>
          <span className="header-bpm">BPM</span>
          <span className="header-key">KEY</span>
          <span className="header-price">PRICE</span>
          <span className="header-cart"></span>
        </div>
        {beats.map((beat) => (
          <BeatListItem
            key={beat.id}
            beat={beat}
            isPlaying={nowPlaying === beat.id}
            onPlay={handlePlay}
          />
        ))}
      </div>
    </div>
  );
};

export default BeatsPage;