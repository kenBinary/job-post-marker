import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    emptyOutDir: false,
    outDir: "dist",
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, "src/content.ts"),
        background: path.resolve(__dirname, "src/services/background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        inlineDynamicImports: false,
        manualChunks: undefined,
      },
    },
  },
});
