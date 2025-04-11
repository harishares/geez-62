
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'

// Set the theme to dark-purple by default
document.documentElement.setAttribute('data-theme', 'dark-purple');

// Async function to initialize Capacitor plugins
const initCapacitor = async () => {
  if (window.Capacitor) {
    try {
      // Import Capacitor plugins only if running in Capacitor environment
      const { SplashScreen } = await import('@capacitor/splash-screen');
      const { App: CapApp } = await import('@capacitor/app');
      
      // Hide splash screen
      await SplashScreen.hide();
      
      // Handle back button for Android
      CapApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          CapApp.exitApp();
        } else {
          window.history.back();
        }
      });
    } catch (error) {
      console.error('Error initializing Capacitor:', error);
    }
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Init Capacitor if available
  initCapacitor();
  
  // Render React app
  createRoot(document.getElementById("root")!).render(<App />);
});
