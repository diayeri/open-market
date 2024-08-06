import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // root: "src",
  base: "/open-market/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        login: path.resolve(__dirname, "src/login.html"),
        cart: path.resolve(__dirname, "src/cart.html"),
        // signup: path.resolve(__dirname, "src/signup.html"),
        // product: path.resolve(__dirname, "src/product.html"),
        // payment: path.resolve(__dirname, "src/payment.html"),
        // error404: path.resolve(__dirname, "src/error404.html"),
      },
    },
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
  },
});
