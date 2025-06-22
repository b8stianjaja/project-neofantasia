import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Here you would typically send the form data to a server
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setStatus(`Message sent, ${formData.name}! We'll be in touch.`);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <h1>Mission Control</h1>
      <p>Have a question or a special request? Send us a transmission.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Callsign (Name)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Comms Link (Email)"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="crystal-button">Transmit Message</button>
      </form>
      {status && <p className="form-status">{status}</p>}
    </div>
  );
}

export default ContactPage;