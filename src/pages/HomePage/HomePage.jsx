// src/pages/HomePage.jsx
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css'; // Linking to the new, final CSS design.

function HomePage() {
  // Game-style menu labels that map to your website's pages.
  const menuItems = [
    { path: "/beats", label: "new game" },         // Links to the main beats catalog
    { path: "/saved", label: "load game" },        // Links to saved/favorited beats
    { path: "/licenses-faq", label: "options" },   // Links to Licenses/FAQ page
    { path: "/contact", label: "contact" }         // Using Contact as an "Exit" or "Credits" alternative
  ];

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(e => {});
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => {});
    }
  };

  return (
    <main className="title-screen">
      {/* Background and overlay elements are handled entirely in CSS for a cleaner component */}
      
      <audio ref={hoverSoundRef} src="/audio/menu-hover.wav" preload="auto"></audio>
      <audio ref={clickSoundRef} src="/audio/menu-click.wav" preload="auto"></audio>

      {/* Main container for all centered content */}
      <div className="title-content">
        <div className="logo-container">
          <img src="/bgr/rl.png" alt="Artist Logo" className="title-logo" />
        </div>

        <nav className="main-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                onMouseEnter={playHoverSound}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <NavLink
                  to={item.path}
                  className="menu-link"
                  onClick={playClickSound}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <footer className="title-footer">
        <p>© {new Date().getFullYear()} Your Artist Name. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default HomePage;