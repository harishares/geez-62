
import { useEffect, useState } from 'react';

export function useCapacitor() {
  const [isNative, setIsNative] = useState(false);
  
  useEffect(() => {
    // Check if running in Capacitor native environment
    if (window.Capacitor) {
      setIsNative(window.Capacitor.isNativePlatform() || false);
    }
  }, []);
  
  const showNotification = async (title: string, body: string) => {
    if (window.Capacitor?.Plugins?.LocalNotifications) {
      try {
        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: new Date().getTime(),
              schedule: { at: new Date(Date.now() + 1000) },
              sound: null,
              attachments: null,
              actionTypeId: "",
              extra: null
            }
          ]
        });
        return true;
      } catch (error) {
        console.error('Error showing notification:', error);
        return false;
      }
    }
    return false;
  };
  
  return {
    isNative,
    showNotification
  };
}
