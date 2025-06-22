import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { CartProvider } from './context/CartContext.jsx' // Import the provider
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)