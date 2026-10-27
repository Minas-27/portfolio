import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The system first, so section stylesheets can refine it.
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
