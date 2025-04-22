import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add JSX support for .js files
      include: '**/*.{jsx,js}',
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  // Base path for production builds
  base: './',
});
