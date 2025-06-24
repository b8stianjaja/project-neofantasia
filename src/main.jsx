import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import './app/App.css';
import { BrowserRouter } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MusicProvider musicSrc="/sfx/title-theme.wav">
        <CartProvider>
          <App />
        </CartProvider>
      </MusicProvider>
    </BrowserRouter>
  </React.StrictMode>,
);