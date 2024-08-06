import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/",
  build: {
    outDir: "../public",
  },
  server: {
    port: 3000,
  },
});
