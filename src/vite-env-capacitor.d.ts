
/// <reference types="vite/client" />

interface Window {
  Capacitor?: {
    isNativePlatform: () => boolean;
    Plugins?: {
      SplashScreen?: {
        hide: () => Promise<void>;
      };
      App?: {
        exitApp: () => Promise<void>;
        addListener: (eventName: string, callback: (data: any) => void) => void;
      };
    };
  };
}
