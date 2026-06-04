import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      // Two entry points: the landing page (index.html) and the
      // design-system documentation site (docs.html).
      input: {
        main: path.resolve(__dirname, 'index.html'),
        docs: path.resolve(__dirname, 'docs.html'),
      },
    },
  },
});
