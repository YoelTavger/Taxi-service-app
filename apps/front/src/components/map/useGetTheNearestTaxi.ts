import { useEffect, useState } from 'react';
import { tRPC } from '../../tRPCclient';

const useGetTheNearestTaxi = (latitude: number, longitude: number) => {
  const [taxiData, setTaxiData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const taxiData = await tRPC.getTheNearestTaxi.query({
        x: latitude,
        y: longitude,
      });
      console.log(taxiData);
      setTaxiData(taxiData);
      return taxiData;
    };

    fetchData();
  }, []);
  return taxiData
};

export default useGetTheNearestTaxi;
