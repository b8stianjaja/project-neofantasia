// src/app/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import BeatsPage from '../pages/BeatsPage/BeatsPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import './App.css';

function App() {
  React.useEffect(() => {
    document.body.classList.add('vn-body');
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beats" element={<BeatsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;