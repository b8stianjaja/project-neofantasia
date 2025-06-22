// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout'; // Import the new Layout component
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import CartPage from '../pages/CartPage/CartPage'; // Import CartPage
import './App.css';

function App() {
  React.useEffect(() => {
    document.body.classList.add('vn-body');
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Layout />}> {/* Use Layout as the parent element */}
            <Route index element={<HomePage />} /> {/* Renders HomePage at "/" */}
            <Route path="beats" element={<BeatsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} /> {/* Add route for CartPage */}
          </Route>
          {/* You can add routes outside the Layout if they need a completely different structure (e.g., a login page) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;