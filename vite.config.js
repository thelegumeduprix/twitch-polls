import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
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
});
