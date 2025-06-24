// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook to use the context easily
export const useCart = () => {
  return useContext(CartContext);
};

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Logic to add a beat to the cart, reverting to original structure
  const addToCart = (beat) => {
    setCartItems(prevItems => {
      // Prevents adding duplicates based on beat.id
      if (!prevItems.find(item => item.id === beat.id)) {
        return [...prevItems, beat];
      }
      return prevItems;
    });
    // Log message for original beat structure
    console.log(`${beat.title || beat.name} added to cart!`); // Use title or name
  };

  // Logic to remove a beat, reverting to original structure
  const removeFromCart = (beatId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== beatId));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};