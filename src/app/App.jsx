import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import CartPage from '../pages/CartPage/CartPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import InteractionScreen from '../pages/InteractionScreen/InteractionScreen';
import './App.css';

function App() {
  const [showInteractionScreen, setShowInteractionScreen] = useState(true);

  if (showInteractionScreen) {
    return <InteractionScreen onInteract={() => setShowInteractionScreen(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/beats" element={<BeatsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />
      {/* You can add routes for these placeholder links from your HomePage */}
      <Route path="/load" element={<BeatsPage />} /> 
      <Route path="/config" element={<ContactPage />} />
    </Routes>
  );
}

export default App;