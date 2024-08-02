import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../public",
  },
  server: {
    port: 3000,
  },
});
