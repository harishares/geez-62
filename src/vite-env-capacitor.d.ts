
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
      LocalNotifications?: {
        schedule: (options: {
          notifications: Array<{
            title: string;
            body: string;
            id: number;
            schedule?: { at: Date };
            sound?: string | null;
            attachments?: any | null;
            actionTypeId?: string;
            extra?: any | null;
          }>
        }) => Promise<void>;
      };
    };
  };
}
