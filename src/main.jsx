// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import './app/App.css';
// REMOVE: import { CartProvider } from './context/CartContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* BrowserRouter remains as the single top-level router */}
      {/* REMOVE: <CartProvider> */}
        <App />
      {/* REMOVE: </CartProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
);