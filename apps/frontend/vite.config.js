import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import image from "@rollup/plugin-image";
import path from 'path';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@assets': path.resolve(__dirname, './src/assets/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@pages': path.resolve(__dirname, './src/pages/'),
        '@store': path.resolve(__dirname, './src/store/'),
        '@UI': path.resolve(__dirname, './src/UI/'),
        '@utils': path.resolve(__dirname, './src/utils/'),
        '@lib': path.resolve(__dirname, './src/lib/'),
      },
    },
    plugins: [image(), react({ include: "**/*.{jsx,tsx}" })],
    server: {
      proxy: {
        '/backend': {
          target: env.VITE_DEV_URL,
          changeOrigin: true,
        }
      }
    }
  }
});