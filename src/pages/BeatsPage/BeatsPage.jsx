import React from 'react';
import { NavLink } from 'react-router-dom';
import './../Page.css'; // Import the shared page styles

function BeatsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Beats Catalog</h1>
      {/* Your beat listing components will go here */}
      <p>Coming soon...</p>
      <NavLink to="/" className="back-link">
        &larr; Back to Menu
      </NavLink>
    </div>
  );
}

export default BeatsPage;