import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "GreenER backend funcionando",
  });
});

app.use("/auth", authRoutes);

export default app;