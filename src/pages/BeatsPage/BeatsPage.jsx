// src/pages/BeatsPage/BeatsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import BeatCard from '../../entities/beat/BeatCard';
import { beats } from '../../entities/beat/beats';
import './BeatsPage.css';

const BeatsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
         <Link to="/" className="back-button">← Main Menu</Link>
         <h1 className="page-title">Sound Library</h1>
      </div>
      <div className="beats-grid">
        {beats.map((beat) => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>
    </div>
  );
};

export default BeatsPage;