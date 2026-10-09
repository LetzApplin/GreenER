import { useEffect, useState } from "react";
import { ServiceList } from "../components/ServiceList";
import { discoverServices } from "../services/serviceApi";
import type { MonitoredService } from "../types/service";
import { ServicePopover } from "../components/ServicePopover";
import "./Monitoring.css";


const REFRESH_INTERVAL_MS = 10_000;
const REQUEST_TIMEOUT_MS = 8_000;

export function Monitoring() {
  const [services, setServices] = useState<MonitoredService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const total = services.length;

  const activeCount = services.filter(
    (service) =>
      service.status === "active" ||
      service.status === "new" ||
      service.status === "returned",
  ).length;

  useEffect(() => {
    let disposed = false;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | null = null;

    async function loadServices() {
      controller = new AbortController();
      const requestTimeout = setTimeout(() => {
        controller?.abort();
      }, REQUEST_TIMEOUT_MS);

      try {
        const data = await discoverServices(controller.signal);
        if (disposed) return;
        
        setServices((previous) => {
          const currentById = new Map(
            data.services.map((service) => [service.id, service]),
          );
          const knownIds = new Set(previous.map((service) => service.id));
          const remembered = previous.map((service) => {
            const current = currentById.get(service.id);
            if (!current) {
              return {
                ...service,
                status: "unavailable" as const,
              };
            }

            if (service.status === "unavailable") {
              return {
                ...current,
                status: "returned" as const,
              };
            }
            return {
              ...current,
              status: "active" as const,
            };
          });

           const isFirstLoad = previous.length === 0;

          const discovered = [...currentById.values()]
            .filter((service) => !knownIds.has(service.id))
            .map((service) => ({ ...service,
               status: isFirstLoad? ("active" as const):
              ("new" as const), }));

          return [...remembered, ...discovered];
              

          
        });

        setError(null);
      } catch (error) {
        if (disposed) return;
        console.error("[Monitoring] Falha ao carregar serviços:", error);
        setError("Erro ao carregar os serviços");
      } finally {
        clearTimeout(requestTimeout);
        if (!disposed) {
          setLoading(false);
          refreshTimer = setTimeout(loadServices, REFRESH_INTERVAL_MS);
        }
      }
    }

    loadServices();
    return () => {
      disposed = true;
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
      controller?.abort();
    };
  }, []);

  function getStatusLabel(status: MonitoredService["status"]) {
    switch (status) {
      case "active":
        return "Ativo";

      case "new":
        return "Novo serviço detectado";

      case "returned":
        return "Serviço retornou";

      case "unavailable":
        return "Serviço indisponível";
    }
  }

  return (
    <>
      <main className="monitoring-page">
        <section className="monitoring-header">
          <h1>Monitoramento de Serviços</h1>

          <p>Acompanhe os serviços identificados pelo GreenER.</p>
          <p className="refresh-note">
            Atualização automática a cada 10 segundos.
          </p>
        </section>

        {loading && <p role="status">Carregando serviços...</p>}
        {error && (
          <p role="alert">
            {error}. Uma nova tentativa será feita automaticamente.
          </p>
        )}
        {!loading && !error && services.length === 0 && (
          <p role="status">Nenhum serviço encontrado.</p>
        )}

        {services.length > 0 && (
          <>
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
                  <div
                    key={service.id}
                    className="service-indicator-wrapper"
                    tabIndex={0}
                    aria-label={`${service.name}: ${getStatusLabel(service.status)}`}
                  >
                    <span 
                      className={`service-indicator ${service.status}` }
                      aria-hidden="true"
                      />

               <ServicePopover service={service}/>
              </div> 
              
         ))}
         </div>
            </section>

            <ServiceList services={services} />
          </>
        )}
      </main>
    </>
  );
}
