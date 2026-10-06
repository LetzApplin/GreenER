import { Router } from "express";
import { ServicosController } from "./servicos.controller.js";

// ============================================================
// ROTAS DO MÓDULO DE SERVIÇOS
// Prefixo: /api/servicos (definido no app.ts)
// ============================================================

const router = Router();
const controller = new ServicosController();

// GET /api/servicos/discover → Descobrir serviços
router.get("/discover", (req, res, next) =>
  controller.discover(req, res, next),
);

export default router;
