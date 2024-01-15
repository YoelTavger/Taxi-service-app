import { useEffect, useState } from "react";
import { tRPC } from "../../tRPCclient";

const t = tRPC;

interface Taxi {
  taxi_id: string;
  model: string;
  license_plate: string;
  current_location: { x: number; y: number };
  availability: string;
}

interface QueryResponse {
  [key: string]: Taxi[];
}

const useGetTaxisBusyCoords = (query: string) => {
  const [coords, setCoords] = useState<Taxi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taxiData: Taxi[] = await t[query].query() as Taxi[];
        setCoords(taxiData);
      } catch (error) {
        setError(`Error fetching user data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); 

  return { coords, loading, error };
};

export default useGetTaxisBusyCoords;
