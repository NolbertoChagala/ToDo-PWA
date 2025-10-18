import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Se actualiza solo cuando subes nueva versión
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "PWA-TODO-JEPH-NCC",
        short_name: "PWA-JEPH-NCC",
        description: "Una aplicación de lista de tareas simple y efectiva.",
        start_url: ".",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0078D7",
        orientation: "portrait",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Archivos que se guardarán para modo offline
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
