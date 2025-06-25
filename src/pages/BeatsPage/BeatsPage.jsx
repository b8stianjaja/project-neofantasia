import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import beats from '../../entities/beat/beats';
import BeatListItem from '../../entities/beat/BeatListItem';
import { useMusic } from '../../context/MusicContext';
import './BeatsPage.css';

const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function BeatsPage() {
  const [selectedBeat, setSelectedBeat] = useState(beats[0]);
  // Importing the new explicit functions
  const { playBeat, pauseBeat, currentTrack, isPlaying, playbackInfo, seekTo } = useMusic();
  
  const timelineRef = useRef(null);

  const handleSelectBeat = (beat) => {
    setSelectedBeat(beat);
  };
  
  // New, separate handlers for clarity and reliability
  const handlePlay = (beat) => {
    setSelectedBeat(beat);
    playBeat(beat);
  };

  const handlePause = () => {
    pauseBeat();
  };

  const handleSeek = (event) => {
    if (!timelineRef.current || !currentTrack) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(percentage);
  };

  const displayBeat = currentTrack || selectedBeat;
  const isPlayingSelectedBeat = currentTrack?.id === displayBeat?.id && isPlaying;
  const progressPercent = currentTrack?.id === displayBeat?.id && playbackInfo.duration > 0 ? (playbackInfo.seek / playbackInfo.duration) * 100 : 0;
  const beatDuration = currentTrack?.id === displayBeat?.id ? playbackInfo.duration : displayBeat.duration;
  const currentTime = formatTime(isPlayingSelectedBeat ? playbackInfo.seek : 0);
  const totalTime = formatTime(beatDuration);

  return (
    <main className="beats-page-layout">
      <div className="beat-list-container">
        <div className="beat-list-header">
          <span>Track</span>
          <span>BPM</span>
          <span>Key</span>
          <span>Price</span>
        </div>
        <div className="beat-list-items">
          {beats.map((beat) => (
            <BeatListItem
              key={beat.id}
              beat={beat}
              isPlaying={currentTrack?.id === beat.id && isPlaying}
              isSelected={selectedBeat?.id === beat.id}
              // Pass both handlers down as props
              onPlay={() => handlePlay(beat)}
              onPause={handlePause}
              onSelect={() => handleSelectBeat(beat)}
            />
          ))}
        </div>
      </div>
      <div className="artwork-display-container">
        {displayBeat && (
          <>
            <img src={displayBeat.artwork} alt={displayBeat.name} className={`artwork-image ${isPlayingSelectedBeat ? 'playing' : ''}`} />
            <h2 className="artwork-title">{displayBeat.name}</h2>
            <div ref={timelineRef} className="timeline-container" onClick={handleSeek}>
              <div className="timeline-progress" style={{ width: `${progressPercent}%` }}>
                <div className="timeline-handle"></div>
              </div>
            </div>
            <div className="timer-display">
              <span>{currentTime}</span>
              <span>{totalTime}</span>
            </div>
          </>
        )}
      </div>
      <NavLink to="/" className="back-to-menu-link"> &larr; Back </NavLink>
    </main>
  );
}

export default BeatsPage;