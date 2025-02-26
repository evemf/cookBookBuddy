import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Obtener el nombre y directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Vite
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),  // Directorio de salida
    assetsDir: 'assets',
    emptyOutDir: true,  // Vaciar el directorio de salida antes de la construcción
  },
});
