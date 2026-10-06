import type {Service} from "../types/service";
import {ServiceCard} from "./ServiceCard";
import "./ServiceList.css";

type ServiceListProps = {
    services: Service[];
};

export function ServiceList ({services}: ServiceListProps) {
    return (
        <section className="service-list">
            {services.map((service)=>(
                <ServiceCard
                key={service.id}
                service={service}
               />
            ))}
        </section>
    );
}