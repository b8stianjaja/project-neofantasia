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

  const addToCart = (beat) => {
    // Logic to add a beat to the cart
    // Prevents adding duplicates
    setCartItems(prevItems => {
      if (!prevItems.find(item => item.id === beat.id)) {
        return [...prevItems, beat];
      }
      return prevItems;
    });
    console.log(`${beat.title} added to cart!`);
  };

  const removeFromCart = (beatId) => {
    // Logic to remove a beat
    setCartItems(prevItems => prevItems.filter(item => item.id !== beatId));
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};