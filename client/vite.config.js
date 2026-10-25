import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], 
  server: { // The client runs on port 5173 and the server on 3000. A proxy makes the browser think they are one site, so fetch('/health') just works.
    proxy: {
      '/api': 'http://localhost:3000',
      '/health': 'http://localhost:3000',
    },
  },
})
