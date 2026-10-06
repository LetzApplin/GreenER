import type { Service } from"../types/service";

type ServiceCardProps = {
    service: Service;

};

export function ServiceCard ({service}:ServiceCardProps) {
    return(
        <article>
            <h2>{service.name}</h2>

            <p>
                {service.location.city ?? "Cidade não informada"},{" "}
                {service.location.country}
            </p>

            <p> {service.location.region_code} </p>


        </article>
    );
}