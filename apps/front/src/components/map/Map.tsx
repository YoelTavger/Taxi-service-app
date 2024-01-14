import React, { useEffect, useMemo, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { coords } from '../dataCoords';
import { RMap, ROSM, RLayerVector, RFeature, RStyle, RPopup } from 'rlayers';
import locationIcon from '../../images/Taxi-icon-red.png';
import { UserLocation } from '../UserLocation';
import getZoom from './getZoom';
import getCenterCoords from './getCenterCoords';
import TaxiOrderForm from '../TaxiOrderForm';
import TaxisAvailable from './TaxisAvailable';

const Map = (): JSX.Element => {

  const points = coords.map((coord) => coord.coordinates);
  const centerCoords = useMemo(() => getCenterCoords(points), [points]);
  const zoom = useMemo(() => getZoom(points), [points]);

  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
  };

  const handleOrderFormClose = () => {
    setShowOrderForm(false);
  };

  return (
    <>
      <div>
        <RMap
          className="w-[60vh] h-[60vh] border-4 border-solid border-amber-500 rounded-[5%] overflow-hidden shadow-[0_0_10px]"
          initial={{ center: fromLonLat(centerCoords), zoom: zoom }}
        >
          <ROSM attributions="Yoel Tavger" opacity={0.85} />

          {userLocation && <UserLocation userCoordinates={userLocation} />}
          {coords.map((coord) => (
            <RLayerVector key={coord.name} zIndex={10}>
              <RStyle.RStyle >
                <RStyle.RIcon
                  src={locationIcon}
                  scale={0.04}
                  anchor={[0.5, 0.8]}
                />
              </RStyle.RStyle>
              <RFeature
                geometry={new Point(fromLonLat(coord.coordinates))}
              >
                <RPopup
                  trigger='hover'
                  className='bg-amber-500 text-white p-2 rounded-xl grid justify-items-center max-w-48 max-h-48'>
                  <p>{coord.name}</p>
                </RPopup>
              </RFeature>
            </RLayerVector>
          ))}

          <TaxisAvailable />

        </RMap>
        <button
          style={{
            boxShadow: '0  0 10px ',
          }}
          onClick={handleOrderButtonClick}
          className="flex w-full justify-center rounded-md bg-amber-500 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Order a taxi
        </button>
        {showOrderForm && (
          <TaxiOrderForm
            onClose={handleOrderFormClose}
            onConfirm={handleOrderFormClose}
          />
        )}
      </div>
    </>
  );
};

export default Map;
