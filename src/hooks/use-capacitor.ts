
import { useEffect, useState } from 'react';

export function useCapacitor() {
  const [isNative, setIsNative] = useState(false);
  
  useEffect(() => {
    // Check if running in Capacitor native environment
    setIsNative(window.Capacitor?.isNativePlatform() || false);
  }, []);
  
  return {
    isNative
  };
}
