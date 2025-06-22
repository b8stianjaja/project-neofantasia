// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();

  // Use NavLink for active styling
  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <NavLink to="/" className="nav-logo">neofantasia</NavLink>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-link" end>Hub</NavLink>
        <NavLink to="/beats" className="nav-link">Sound Library</NavLink>
        <NavLink to="/contact" className="nav-link">Broadcast</NavLink>
      </div>
      <div className="nav-actions">
        <NavLink to="/cart" className="nav-link cart-link">
          Cart ({cartCount})
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;