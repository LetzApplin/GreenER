import { useEffect, useState } from "react";
import { ServiceList } from "../components/ServiceList";
import { discoverServices } from "../services/serviceApi";
import type { Service } from "../types/service";
import "./Monitoring.css";
import { Header } from "../components/Header";

export function Monitoring() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await discoverServices();
        setServices(data.services);
      } catch {
        setError("Erro ao carregar os serviços");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return <p> Carregando serviços...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (services.length === 0) {
    return <p>Nenhum serviço encontrado.</p>;
  }

  return (
    <>
      <Header />
      <main className="monitoring-page">
        <section className="monitoring-header">
          <h1>Monitoramento de Serviços</h1>

          <p>Acompanhe os serviços identificados pelo GreenER.</p>
        </section>

        <section className="services-summary">
          <div className="services-summary-info">
            <h3>Serviços detectados</h3>
            <strong>
              {services.length}/{services.length}
            </strong>
            <p>Serviços Ativos</p>
          </div>

          <div className="services-summary-grid">
            {services.map((service) => (
              <span
                key={service.id}
                className="service-indicator active"
                title={service.name}
              />
            ))}
          </div>
        </section>

        <ServiceList services={services} />
      </main>
    </>
  );
}
