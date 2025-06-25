import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import './app/App.css';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This is the ONLY router for the entire app */}
    <BrowserRouter>
      {/* Both providers wrap the App component */}
      <CartProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);