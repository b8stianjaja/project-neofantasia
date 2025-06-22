import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit" className="crystal-button">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;