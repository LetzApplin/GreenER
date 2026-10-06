import type { Service } from "../types/service";
import "./ServiceCard.css";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card-header">
        <div>
          <h2>{service.name}</h2>
          <span className="service-region-code">
            {service.location.region_code}
          </span>
        </div>
      </div>

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
