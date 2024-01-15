import { useEffect } from "react";
import { RFeature, RLayerVector, RPopup, RStyle } from "rlayers";
import greenTaxi from "../../images/Taxi-icon-red.png"
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import useGetTaxisBusyCoords from "./useGetTaxisBusyCoords";

const TaxisBusy = () => {
  const query = "getBusyTaxiData"
  const { coords, loading, error } = useGetTaxisBusyCoords(query);

  useEffect(() => {
    console.log(coords);
  }, [coords]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      {coords.map((coord) => (
        <RLayerVector key={coord.license_plate} zIndex={10}>
          <RStyle.RStyle>
            <RStyle.RIcon src={greenTaxi} scale={0.04} anchor={[0.5, 0.8]} />
            <RFeature
              geometry={new Point(fromLonLat([coord.current_location.x, coord.current_location.y]))}
            >
              <RPopup
                trigger='hover'
                className='bg-amber-500 text-white p-2 rounded-xl grid justify-items-center max-w-48 max-h-48'>
                <p>{coord.model}</p>
              </RPopup>
            </RFeature>
          </RStyle.RStyle>
        </RLayerVector>
      ))}
    </div>
  );
};

export default TaxisBusy;
