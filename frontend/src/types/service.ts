export type ServiceLocation = {
    region_code: string;
    country: string;
    region: string;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
};

export type Service ={
    id: string;
    name: string;
    location: ServiceLocation;
    metrics_path: string;
};

export type DiscoverServicesResponse ={
    message: string;
    services: Service[];
};

export type MonitoredService = Service & {
    available: boolean;
};
