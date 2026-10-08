import { Router } from "express";
import { ServicosController } from "./servicos.controller.js";

const router = Router();
const controller = new ServicosController();

// US01: Descobrir serviços
router.get("/discover", (req, res, next) =>
  controller.discover(req, res, next),
);

// US02: Sincronizar serviços (salvar no banco)
router.post("/sync", (req, res, next) => controller.sync(req, res, next));

export default router;
