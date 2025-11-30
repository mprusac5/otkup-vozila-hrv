import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

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

    // Auto-create GitHub Pages fallback (fix 404)
    {
      name: "github-pages-redirect",
      writeBundle() {
        fs.writeFileSync(
          "dist/404.html",
          `<meta http-equiv="refresh" content="0; url=/otkup-vozila-hrv/">`
        );
      },
    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
