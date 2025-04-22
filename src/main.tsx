
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'

// Set the theme to dark-purple by default
document.documentElement.setAttribute('data-theme', 'dark-purple');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Render React app
  createRoot(document.getElementById("root")!).render(<App />);
});
