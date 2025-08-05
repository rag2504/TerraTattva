import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Only serve static files and SPA fallback in production
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // Serve static files from the SPA build
    app.use(express.static(path.join(process.cwd(), "dist/spa")));
  }

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Only serve SPA fallback in production
  if (isProduction) {
    // Serve the SPA for all non-API routes
    app.get("*", (_req, res) => {
      res.sendFile(path.join(process.cwd(), "dist/spa/index.html"));
    });
  }

  return app;
}
