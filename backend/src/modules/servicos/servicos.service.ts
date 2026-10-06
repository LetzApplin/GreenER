import { env } from "../../config/env.js";
import { ExternalApiError } from "../../shared/errors/AppError.js";

// ============================================================
// TIPO: ExternalService
// Representa o que a API externa retorna (snake_case)
// ============================================================
export interface ExternalService {
  id: string;
  name: string;
  region_code: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}

// ============================================================
// CLASSE: ServicosService
// Responsabilidade: Consultar e interpretar serviços
// ============================================================
export class ServicosService {
  // ========================================================
  // US01: Consultar /services e interpretar o retorno
  // ========================================================
  async discoverServices(): Promise<ExternalService[]> {
    console.log("🔍 Descobrindo serviços...");

    const url = `${env.metricsApiUrl}/services`;

    // AbortController: cancela se passar do timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      env.externalApiTimeoutMs,
    );

    try {
      // --------------------------------------------------
      // PASSO 1: CONSULTAR /services
      // --------------------------------------------------
      const response = await fetch(url, {
        signal: controller.signal,
      });

      // Verifica se a resposta foi OK
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // --------------------------------------------------
      // PASSO 2: INTERPRETAR O JSON
      // --------------------------------------------------
      const services: ExternalService[] = await response.json();

      // --------------------------------------------------
      // PASSO 3: IDENTIFICAR OS SERVIÇOS
      // --------------------------------------------------
      console.log(`✅ ${services.length} serviços encontrados`);

      services.forEach((svc) => {
        console.log(`  - ${svc.name} (${svc.region_code})`);
      });

      return services;
    } catch (error) {
      console.error("❌ Erro na API Metrics:", error);
      throw new ExternalApiError("Falha ao consultar a API de métricas");
    } finally {
      // Limpa o timeout
      clearTimeout(timeoutId);
    }
  }
}
