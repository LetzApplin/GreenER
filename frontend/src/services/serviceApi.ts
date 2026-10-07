import type {DiscoverServicesResponse} from "../types/service";

const API_URL = import.meta.env.VITE_API_URL;

export async function discoverServices(signal?: AbortSignal): Promise<DiscoverServicesResponse> {
    const response = await fetch(`${API_URL}/api/servicos/discover`, { signal, cache: "no-store" });

    if (!response.ok){
        throw new Error ("Não foi possível carregar os serviços");
      }

      return response.json();
}
