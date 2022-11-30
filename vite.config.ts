/// <reference types="vitest" />
import path from "path";

import react from "@vitejs/plugin-react";

/// <reference types="vitest" />
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});