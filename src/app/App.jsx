// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import CartPage from '../pages/CartPage/CartPage';
import './App.css'; // Keep global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Each route now renders its component directly as a full page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/beats" element={<BeatsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;