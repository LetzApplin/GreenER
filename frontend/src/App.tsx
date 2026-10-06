import { useEffect, useState } from "react";
import { discoverServices } from "./services/serviceApi";
import type { Service } from "./types/service";
import { ServiceCard } from "./components/ServiceCard";

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await discoverServices();
        setServices(data.services);
      } catch (err) {
        setError("Erro ao carregar os serviços");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return <p>Carregando serviços...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (services.length === 0) {
    return <p>Nenhum serviço encontrado.</p>;
  }

  return (
    <div>
      <h1>Serviços detectados</h1>

     {services.map((service) => (
  <ServiceCard
    key={service.id}
    service={service}
  />
))}
    </div>
  );
}

export default App;