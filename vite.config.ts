import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" faz o build funcionar em qualquer subcaminho do GitHub Pages
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { chunkSizeWarningLimit: 800 },
});
