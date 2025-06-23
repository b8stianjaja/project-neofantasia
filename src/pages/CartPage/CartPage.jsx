import React from 'react';
import { useCart } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';
import './../Page.css'; // Import the shared page styles

function CartPage() {
  const { cartItems } = useCart();
  return (
    <div className="page-container">
      <h1 className="page-title">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
       <NavLink to="/" className="back-link">
        &larr; Back to Menu
      </NavLink>
    </div>
  );
}

export default CartPage;