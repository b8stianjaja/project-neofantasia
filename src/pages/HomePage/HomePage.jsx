import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
// We no longer need to import useMusic here

function HomePage() {
  const [hoveredItem, setHoveredItem] = useState(null);

  // THE FIX: The useEffect that called play() and pause() has been completely removed.

  const menuItems = [
    { name: "new game", path: "/beats", normal: "/menu/newgame12.png", hover: "/menu/newgame12hover.png" },
    { name: "load game", path: "/load", normal: "/menu/loadgame12.png", hover: "/menu/loadgame12hover.png" },
    { name: "config", path: "/config", normal: "/menu/config12.png", hover: "/menu/config12hover.png" },
    { name: "exit", path: "/contact", normal: "/menu/exit12.png", hover: "/menu/exit12hover.png" }
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
      <audio ref={hoverSoundRef} src="/sfx/hover.wav" preload="auto"></audio>
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