import React, { useEffect } from 'react';
import { RFeature, RLayerVector, RPopup, RStyle } from 'rlayers';
import redTaxi from '../../images/Taxi-icon-red.png';
import greenTaxi from '../../images/Taxi-icon-green.png';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import useGetTaxisBusyCoords from './useGetTaxisBusyCoords';
import { TaxiAvailability } from '../../types';


interface Props {
  availability: TaxiAvailability;
}

const TaxisBusy: React.FC<Props> = ({ availability }) => {
  const { coords, loading, error } = useGetTaxisBusyCoords({ query: availability });

  useEffect(() => {
    console.log(coords);
  }, [coords]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      {coords.map((coord) => (
        <RLayerVector key={coord.taxi_id} zIndex={10}>
          <RStyle.RStyle>
            {availability === TaxiAvailability.Busy ? (
              <RStyle.RIcon src={redTaxi} scale={0.05} anchor={[0.5, 0.8]} />
            ) : (
              <RStyle.RIcon src={greenTaxi} scale={0.04} anchor={[0.5, 0.8]} />
            )}
            <RFeature
              geometry={
                new Point(
                  fromLonLat([
                    coord.current_location.x,
                    coord.current_location.y,
                  ])
                )
              }
            >
              <RPopup
                trigger="hover"
                className="bg-amber-500 text-white p-2 rounded-xl grid justify-items-center max-w-48 max-h-48"
              >
                <p>{coord.availability}</p>
              </RPopup>
            </RFeature>
          </RStyle.RStyle>
        </RLayerVector>
      ))}
    </div>
  );
};

export default TaxisBusy;
