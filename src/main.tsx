
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapApp } from '@capacitor/app';

// Set the theme to dark-purple by default
document.documentElement.setAttribute('data-theme', 'dark-purple');

// Hide splash screen when the app is ready (mobile only)
document.addEventListener('DOMContentLoaded', async () => {
  if (window.Capacitor) {
    try {
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
});

createRoot(document.getElementById("root")!).render(<App />);
