import React from 'react';
import { NavLink } from 'react-router-dom';
import './../Page.css'; // Import the shared page styles

function ContactPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact</h1>
      <p>Contact form coming soon...</p>
      <NavLink to="/" className="back-link">
        &larr; Back to Menu
      </NavLink>
    </div>
  );
}

export default ContactPage;