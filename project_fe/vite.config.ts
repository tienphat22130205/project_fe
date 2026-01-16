import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_BASE_URL = 'https://projectbe-fe-production.up.railway.app/';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      API_BASE_URL,
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});