// src/app/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import CartPage from '../pages/CartPage/CartPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import './App.css'; // Assuming you have global app styles

function App() {
  return (
    <> {/* This should remain empty, no BrowserRouter wrapper */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beats" element={<BeatsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </>
  );
}

export default App;