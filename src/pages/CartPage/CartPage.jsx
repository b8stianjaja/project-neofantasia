// src/pages/CartPage/CartPage.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, total } = useCart();

  return (
    <div className="page-container">
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/beats" className="crystal-button">Explore the Sound Library</Link>
          </div>
        ) : (
          <div className="cart-filled">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">{item.title}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-item-button">
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="crystal-button checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;