import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  base: "/wallet",
  build: {
    // Enable dynamic imports
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // chunkFileNames: "[name].js",
      },
    },
  },
});
