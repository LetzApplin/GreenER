import { afterEach, describe, expect, it, vi } from "vitest";
import { ServicosService } from "./servicos.service.js";
import { ExternalApiError } from "../../shared/errors/AppError.js";

// Evita depender das variáveis de ambiente reais.
vi.mock("../../config/env.js", () => ({
  env: {
    metricsApiUrl: "https://metrics.exemplo",
    externalApiTimeoutMs: 5000,
  },
}));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ServicosService.discoverServices", () => {
  it("retorna os serviços recebidos da API", async () => {
    // Preparar: definir os dados e a resposta simulada.
    const services = [
      {
        id: "servico-1",
        name: "API de pedidos",
        location: {
          region_code: "BR-SP",
          country: "Brasil",
          region: "São Paulo",
          city: "São Paulo",
          latitude: -23.55,
          longitude: -46.63,
        },
      },
    ];
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(services), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    vi.stubGlobal("fetch", fetchMock);

    // Executar: chamar o método real.
    const result = await new ServicosService().discoverServices();

    // Verificar: conferir o resultado e a URL consultada.
    expect(result).toEqual(services);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://metrics.exemplo/services",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("lança ExternalApiError quando a API retorna HTTP 500", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, {
          status: 500,
          statusText: "Internal Server Error",
        }),
      ),
    );

    await expect(
      new ServicosService().discoverServices(),
    ).rejects.toBeInstanceOf(ExternalApiError);
  });

  it("lança ExternalApiError quando a conexão falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Falha de conexão")),
    );

    await expect(
      new ServicosService().discoverServices(),
    ).rejects.toBeInstanceOf(ExternalApiError);
  });
});
