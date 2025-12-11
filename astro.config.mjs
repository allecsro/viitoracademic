// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      cssCodeSplit: true, // Split CSS for better caching
      minify: "esbuild", // Use esbuild for faster minification
    },
  },
  devToolbar: { enabled: false }, // Disable dev toolbar

  integrations: [react()],

  build: {
    inlineStylesheets: "auto", // Automatically inline small CSS files to reduce requests
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
