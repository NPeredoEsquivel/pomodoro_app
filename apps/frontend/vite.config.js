import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import image from "@rollup/plugin-image";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@UI': path.resolve(__dirname, './src/UI'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  plugins: [image(), react({ include: "**/*.{jsx,tsx}" })],
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
});