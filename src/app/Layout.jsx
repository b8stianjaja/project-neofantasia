// src/app/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Make sure the path is correct
import './Layout.css'; // Create a corresponding CSS file if needed for layout specific styles

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-content">
        <Outlet /> {/* This is where your routed components (HomePage, BeatsPage, etc.) will render */}
      </main>
      {/* You can add a Footer component here if you have one */}
    </div>
  );
};

export default Layout;