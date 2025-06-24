import React from 'react';
import { NavLink } from 'react-router-dom';
import './../Page.css'; // Import the shared page styles

function BeatsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">INSTRUMENTALS</h1>
      {/* Your beat listing components will go here */}
      <p>EN BREVE...</p>
      <NavLink to="/" className="back-link">
        &larr; baq
      </NavLink>
    </div>
  );
}

export default BeatsPage;