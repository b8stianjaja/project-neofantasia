import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import { CartProvider } from './context/CartContext.jsx'; // Correctly imports the provider
import './app/App.css'; // Correctly imports global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This CartProvider wrapper makes your shopping cart work across all pages.
      Any component in your app can now use the `useCart()` hook to access it.
    */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);