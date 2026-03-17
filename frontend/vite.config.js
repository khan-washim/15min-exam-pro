import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional: Sets frontend to port 3000 instead of 5173
    proxy: {
      // Directs any request starting with /api to your Express server
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      // Optional: Allows you to use @ instead of relative paths like ../../../
      '@': '/src',
    },
  },
});