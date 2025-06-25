// src/app/App.jsx
import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import CartPage from '../pages/CartPage/CartPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import InteractionScreen from '../pages/InteractionScreen/InteractionScreen';
import { useMusic } from '../context/MusicContext'; // Import useMusic
import './App.css';

// This component now handles the `showInteractionScreen` state and calls `unlock`
// It needs to be a child of MusicProvider to use `useMusic`
function AppContentWithInteraction() {
  const [showInteractionScreen, setShowInteractionScreen] = useState(true);
  const { unlock } = useMusic(); // Get the unlock function from MusicContext

  // This function is called when the user interacts with the InteractionScreen
  const handleInteract = useCallback(() => {
    unlock(); // Call the MusicContext's unlock function to resume AudioContext
    setShowInteractionScreen(false); // Hide the interaction screen
  }, [unlock]); // Ensure useCallback correctly depends on 'unlock'

  if (showInteractionScreen) {
    // Pass the handleInteract to the InteractionScreen
    return <InteractionScreen onInteract={handleInteract} />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beats" element={<BeatsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    // The MusicProvider (and CartProvider) are now correctly wrapping <App /> in main.jsx
    // So, we render the AppContentWithInteraction directly here
    <AppContentWithInteraction />
  );
}

export default App;