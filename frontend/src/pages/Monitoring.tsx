import { useEffect, useState } from "react";
import { ServiceList } from "../components/ServiceList";
import { discoverServices } from "../services/serviceApi";
import type { MonitoredService } from "../types/service";
import "./Monitoring.css";
import { Header } from "../components/Header";

export function Monitoring() {
  const [services, setServices] = useState<MonitoredService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const total = services.length;
  const activeCount = services.filter((service) => service.available).length;

  useEffect(() => {
    let disposed = false;
    let refreshTimer: ReturnType<typeof setTimeout>;
    let controller: AbortController;

    async function loadServices() {
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1000);
      try {
        const data = await discoverServices(controller.signal);
        if (disposed) return;
        setServices((previous) => {
          const currentById = new Map(data.services.map((service) => [service.id, service]));
          const knownIds = new Set(previous.map((service) => service.id));
          const remembered = previous.map((service) => {
            const current = currentById.get(service.id);
            return current
              ? { ...current, available: true }
              : { ...service, available: false };
          });
          const discovered = [...currentById.values()]
            .filter((service) => !knownIds.has(service.id))
            .map((service) => ({ ...service, available: true }));
          return [...remembered, ...discovered];
        });
        setError(null);
      } catch (error) {
        if (disposed) return;
        console.error("[Monitoring] Falha ao carregar serviços:", error);
        setError("Erro ao carregar os serviços");
      } finally {
        clearTimeout(timeout);
        if (!disposed) {
          setLoading(false);
          refreshTimer = setTimeout(loadServices, 1000);
        }
      }
    }

    loadServices();
    return () => {
      disposed = true;
      clearTimeout(refreshTimer);
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <main className="monitoring-page">
        <section className="monitoring-header">
          <h1>Monitoramento de Serviços</h1>

          <p>Acompanhe os serviços identificados pelo GreenER.</p>
          <p className="refresh-note">Atualização automática a cada 10 segundos.</p>
        </section>

        {loading && <p role="status">Carregando serviços...</p>}
        {error && <p role="alert">{error}. Uma nova tentativa será feita automaticamente.</p>}
        {!loading && !error && services.length === 0 && <p role="status">Nenhum serviço encontrado.</p>}

        {services.length > 0 && <>
        <section className="services-summary">
          <div className="services-summary-info">
            <h3>Serviços detectados</h3>
            <strong>
              {activeCount}/{total}
            </strong>
            <p>Serviços Ativos</p>
          </div>

          <div className="services-summary-grid">
            {services.map((service) => (
              <span
                key={service.id}
                className={`service-indicator ${service.available ? "active" : "unavailable"}`}
                title={`${service.name}: ${service.available ? "Presente na última consulta" : "Ausente na última consulta"}`}
                role="img"
                aria-label={`${service.name}: ${service.available ? "Presente" : "Ausente"} na última consulta`}
              />
            ))}
          </div>
        </section>

        <ServiceList services={services} />
        </>}
      </main>
    </>
  );
}
