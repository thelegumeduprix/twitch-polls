import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3001,
    },
  },
  test: {
    include: "./test/*",
    //environment: 'jsdom',
  }
});
