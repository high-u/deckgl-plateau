import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  root: "src",
  base: "/",
  publicDir: '../public',
  build: {
    outDir: '../dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        osm: resolve(__dirname, 'src/maptiler/index.html'),
      }
    },
  },
});
