// src/pages/ContactPage/ContactPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(`> Signal received from ${formData.name}. Stand by.`);
    // A real implementation would send the data here
  };

  return (
    <div className="page-container">
        <Link to="/" className="back-button">← Main Menu</Link>
        <div className="contact-form-window">
            <h1 className="contact-title">Contact</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                <label htmlFor="name">Callsign:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Comms Link:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                </div>
                <button type="submit" className="crystal-button">Transmit Message</button>
            </form>
            {status && <p className="form-status">{status}</p>}
        </div>
    </div>
  );
};

export default ContactPage;