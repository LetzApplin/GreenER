import { type Request, type Response, type NextFunction } from "express";
import { ServicosService } from "./servicos.service.js";

// ============================================================
// CLASSE: ServicosController
// Responsabilidade: Orquestrar as requisições HTTP
// ============================================================
export class ServicosController {
  private readonly service: ServicosService;

  constructor() {
    this.service = new ServicosService();
  }

  // ========================================================
  // GET /api/servicos/discover
  // ========================================================
  async discover(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const services = await this.service.discoverServices();

      res.status(200).json({
        message: `${services.length} serviços encontrados`,
        services,
      });
    } catch (error) {
      next(error);
    }
  }
}
