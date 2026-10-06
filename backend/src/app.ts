import express from "express";
import cors from "cors";
import servicosRoutes from "./modules/servicos/servicos.routes.js";
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

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

app.use("/api/servicos", servicosRoutes);
app.use(errorMiddleware);

export default app;