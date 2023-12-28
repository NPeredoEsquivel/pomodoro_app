import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import image from "@rollup/plugin-image";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    /* define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    }, */
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