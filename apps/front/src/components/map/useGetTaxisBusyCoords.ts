import { useEffect, useState } from "react";
import { tRPC } from "../../tRPCclient";
import { Taxi } from "../../types";

interface UseGetTaxisBusyCoordsProps {
  query: "busy" | "available";
}

const useGetTaxisBusyCoords = (props: UseGetTaxisBusyCoordsProps) => {
  const [coords, setCoords] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taxiData = await tRPC.getTaxiByAvailability.query(props.query);
        setCoords(taxiData);
      } catch (error) {
        setError(`Error fetching user data: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.query]);

  return { coords, loading, error };
};

export default useGetTaxisBusyCoords;

