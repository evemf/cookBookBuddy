import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registra las rutas de la API antes de que Vite maneje las solicitudes
(async () => {
  const server = await registerRoutes(app);  // Registra todas las rutas de la API

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Importante: solo configurar Vite en desarrollo después de las rutas del backend
  if (app.get("env") === "development") {
    await setupVite(app, server);  // Solo en desarrollo
  } else {
    serveStatic(app);  // En producción, servir archivos estáticos
  }

  // Sirve siempre en el puerto 5000, tanto para la API como para el frontend
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
