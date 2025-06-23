// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import CartPage from '../pages/CartPage/CartPage'; // Import CartPage
import MainLayout from '../components/MainLayout'; // Import the new Layout
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the standalone, fullscreen homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Routes that will use the MainLayout (with Navbar) */}
          <Route element={<MainLayout />}>
            <Route path="/beats" element={<BeatsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;