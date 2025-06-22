// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (beat) => {
    // Prevent adding the same item multiple times
    setCartItems((prevItems) => {
      if (!prevItems.find(item => item.id === beat.id)) {
        return [...prevItems, beat];
      }
      return prevItems;
    });
  };

  const removeFromCart = (beatId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== beatId));
  };

  const cartCount = cartItems.length;
  
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};