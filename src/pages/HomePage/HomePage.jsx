// src/pages/HomePage/HomePage.jsx
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  // Game-style menu labels that map to your website's pages.
  // I have fixed the paths to point to your existing pages.
  // You can add routes for "/saved" and "/licenses" in App.jsx when you create those pages.
  const menuItems = [
    { path: "/beats", label: "new game" },         // Links to the main beats catalog
    // { path: "/saved", label: "load game" },     // TODO: Create a SavedBeatsPage and add this route in App.jsx
    // { path: "/licenses", label: "options" },    // TODO: Create a LicensesPage and add this route in App.jsx
    { path: "/contact", label: "contact" }         // Links to the Contact page
  ];

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  return (
    <main className="title-screen">
      {/* NOTE: Ensure your audio and image files are in the `public` directory.
        - /public/audio/menu-hover.wav
        - /public/audio/menu-click.wav
        - /public/bgr/rl.png (for the logo)
        - /public/bgr/gfwcyan.gif (for the background, defined in CSS)
      */}
      <audio ref={hoverSoundRef} src="/audio/menu-hover.wav" preload="auto"></audio>
      <audio ref={clickSoundRef} src="/audio/menu-click.wav" preload="auto"></audio>

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
        <p>© {new Date().getFullYear()} neofantasia. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default HomePage;