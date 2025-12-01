import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/project2",
  plugins: [react(), tailwindcss()],
  // inlcuded to reduce the size of the main JavaScript bundle and improve runtime efficiency
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
        },
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx,js,jsx}"],
    exclude: ["e2e/**", "node_modules/**"],
  },
});
