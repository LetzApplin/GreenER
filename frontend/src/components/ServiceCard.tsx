import type { MonitoredService } from "../types/service";
import "./ServiceCard.css";

type ServiceCardProps = {
  service: MonitoredService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={`service-card${service.available ? "" : " unavailable"}`}>
      <div className="service-card-header">
        <div>
          <h2>{service.name}</h2>
          <span className="service-region-code">
            {service.location.region_code}
          </span>
        </div>
      </div>

      {!service.available && <p className="service-status">Ausente na última consulta</p>}

      <div className="service-card-location">
        <p>{service.location.city ?? "Cidade não informada"}</p>

        <p>
          {" "}
          {service.location.region}, {service.location.country}
        </p>
      </div>
    </article>
  );
}
