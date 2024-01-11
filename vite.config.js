import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({ svgo: false /* will otherwise drop the 'viewBox', mis-aligning the icons */ })],
  resolve: {
    alias: {
      '@resources': fileURLToPath(new URL('./resources', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3001,
    },
  },
});
