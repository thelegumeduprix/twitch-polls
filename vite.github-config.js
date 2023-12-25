import { fileURLToPath, URL } from 'node:url';

import defaultConfig from './vite.config.js';
import { mergeConfig } from 'vite';

// https://vitejs.dev/config/
export default mergeConfig(
  defaultConfig,
  {
    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
        fileName: 'poll',
        formats: ['es'],
      },
    },
    // as per the 'Environment Variables' box on https://vitejs.dev/guide/build#library-mode
    define: { 'process.env.NODE_ENV': '"production"' },
  },
  true,
);
