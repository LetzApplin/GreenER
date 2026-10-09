import type { MonitoredService } from "../types/service";
import "./ServiceCard.css";

type ServiceCardProps = {
  service: MonitoredService;
};

function getStatusLabel(status: MonitoredService["status"]) {
  switch (status) {
    case "active":
      return "Ativo";

      case "new":
        return "Novo";

      case "returned":
        return "Retornou";

      case "unavailable":
        return "Indisponível";
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={`service-card ${service.status}`}>
      <div className="service-card-header">
        <div>
          <h2>{service.name}</h2>

          <span className="service-region-code">
            {service.location.region_code}
          </span>
        </div>
      
       <span className={`service-status-badge ${service.status}`}>
        {getStatusLabel(service.status)}
      </span>
    </div>

      <div className="service-card-location">
        <p>
          {service.location.city ?? "Cidade não informada"}
        </p>

        <p>
        {service.location.region}, {service.location.country}
        </p>
      </div>
    </article>
  );
}
