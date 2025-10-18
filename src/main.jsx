import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";


registerSW({
  onNeedRefresh() {
    console.log("🔄 Nueva versión disponible. Recarga para actualizar.");
  },
  onOfflineReady() {
    console.log("✅ App lista para usar sin conexión (offline).");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
