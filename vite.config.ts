import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        configFile: false,
        babelrc: false,
        targets: { browsers: ['defaults', 'last 2 versions'] }
      }
    })
  ],
  server: {
    port: 3000,
    open: false
  }
});
