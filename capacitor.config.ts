
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8018cb866e544758816caf7ea10f0ff4',
  appName: 'GenZ CLG',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://8018cb86-6e54-4758-816c-af7ea10f0ff4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystoreAlias: null,
      keystorePassword: null,
      keystoreAliasPassword: null,
      signingType: null
    }
  }
};

export default config;
