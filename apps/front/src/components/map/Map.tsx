import { useEffect, useMemo, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { coords } from '../dataCoords';
import { RLayerVector, RLayerTile, RMap } from 'rlayers';
import { UserLocation } from '../UserLocation';
import getZoom from './getZoom';
import getCenterCoords from './getCenterCoords';
import TaxiOrderForm from '../TaxiOrderForm';
import TaxisBusy from './TaxisBusy';
import './Map.css';
import { TaxiAvailability } from '../../types';

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
        console.log(position.coords.longitude, position.coords.latitude);
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
    <div className="h-[92vh]">
      <RMap
        className="w-[100%] h-[95%] overflow-hidden "
        initial={{
          center: fromLonLat(userLocation || centerCoords),
          zoom: 15,
        }}
      >
        <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
        <RLayerVector>
          {userLocation && <UserLocation userCoordinates={userLocation} />}
        </RLayerVector>
        <TaxisBusy availability={TaxiAvailability.Busy} />
        <TaxisBusy availability={TaxiAvailability.Available} />
      </RMap>
      <button
        onClick={handleOrderButtonClick}
        className="flex w-full justify-center  bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
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
  );
};

export default Map;
