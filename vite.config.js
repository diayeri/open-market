import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/open-market/",
  build: {
    outDir: "../public",
  },
  server: {
    port: 3000,
  },
});
