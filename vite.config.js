import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Served from a subpath of the user site: laijing-syllabind.github.io/manuscript/
  base: '/manuscript/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Nest the output so the Pages artifact publishes the app at /manuscript/
    // (the user-site repo serves dist/ at the domain root).
    outDir: 'dist/manuscript',
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
