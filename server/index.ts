import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir el frontend desde la carpeta dist
const frontendPath = path.join(__dirname, "../dist");
app.use(express.static(frontendPath));

// Catch-all para que React maneje el routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

(async () => {
  const server = await registerRoutes(app);

  // Manejo de errores
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  // Configurar Vite solo en desarrollo
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Iniciar el servidor en el puerto correcto
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    log(`Server running on port ${port}`);
  });
})();
