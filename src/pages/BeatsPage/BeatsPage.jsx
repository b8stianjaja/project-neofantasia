import React from 'react';
import { beats } from '../../entities/beat/beats';
import BeatCard from '../../entities/beat/BeatCard';
import './BeatsPage.css';

function BeatsPage() {
  return (
    <div className="beats-page">
      <h1 className="beats-page-title">Available Beats</h1>
      <div className="beats-list">
        {beats.map(beat => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>
    </div>
  );
}

export default BeatsPage;