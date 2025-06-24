// src/pages/HomePage/HomePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css'; // We will still use this for layout

function HomePage() {
  // state to track which item is being hovered
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: "new game", path: "/beats",    normal: "/menu/newgame12.png", hover: "/menu/newgame12hover.png" },
    { name: "load game", path: "/load",     normal: "/menu/loadgame12.png", hover: "/menu/loadgame12hover.png" },
    { name: "config", path: "/config",   normal: "/menu/config12.png", hover: "/menu/config12hover.png" },
    { name: "exit", path: "/contact",  normal: "/menu/exit12.png", hover: "/menu/exit12hover.png" }
  ];

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const bgMusicRef = useRef(null); // Ref for background music

  // --- Background Music Playback Logic ---
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = 0.3; // Set a default volume (0.0 to 1.0)

      // This attempts to play the audio unmuted immediately upon component mount.
      bgMusicRef.current.play().catch(e => {
        // This catch block will log any errors if autoplay is blocked by the browser.
        console.error("Background music direct autoplay failed:", e);
      });
    }
  }, []); // Run once on component mount

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(e => console.error("Hover audio play failed:", e));
    }
  };

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.error("Click audio play failed:", e));
    }
  };

  return (
    <main className="title-screen">
      {/* Background Music Audio Tag - Attempts to play unmuted automatically */}
      <audio
        ref={bgMusicRef}
        src="/sfx/title-theme.wav" // **IMPORTANT: Provide your background music file path here**
        autoPlay // Enable autoplay
        loop     // Loop the music
        muted={false} // Explicitly set to false to attempt unmuted playback
        preload="auto"
      ></audio>

      {/* Existing Menu Hover/Click Sounds */}
      <audio ref={hoverSoundRef} src="/audio/menu-hover.wav" preload="auto"></audio>
      <audio ref={clickSoundRef} src="/audio/menu-click.wav" preload="auto"></audio>

      <div className="title-content">
        <div className="logo-container">
          <img src="/bgr/neofantasia2.png" alt="Artist Logo" className="title-logo" />
        </div>

        <nav className="main-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                onMouseEnter={() => {
                  setHoveredItem(item.name);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <NavLink
                  to={item.path}
                  className="menu-link"
                  onClick={playClickSound}
                >
                  <img
                    className="menu-image"
                    src={hoveredItem === item.name ? item.hover : item.normal}
                    alt={item.name}
                    onError={(e) => { e.target.style.display='none'; console.error(`Failed to load image: ${e.target.src}`)}}
                  />
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