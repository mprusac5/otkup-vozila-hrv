import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/otkup-vozila-hrv/",

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // GitHub Pages fallback for SPA
    {
      name: "github-pages-fallback",
      enforce: "post" as const,
      writeBundle() {
        const fs = require("fs");
        fs.writeFileSync(
          "dist/404.html",
          `<meta http-equiv="refresh" content="0; url=/otkup-vozila-hrv/">`
        );
      },
    } as const,
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
