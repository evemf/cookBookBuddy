import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 👉 Asegurar que Express sirva el frontend desde /dist
const frontendPath = path.join(process.cwd(), "dist"); // Cambiado a process.cwd()

app.use(express.static(frontendPath));

// Ruta catch-all para React
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    log(`Server running on port ${port}`);
  });
})();
