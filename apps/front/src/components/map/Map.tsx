import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { coords } from '../dataCoords';
import { RFeature, RMap, ROSM, ROverlay, RStyle, RLayerVector, RLayerTile } from 'rlayers';
import { UserLocation } from '../UserLocation';
import getZoom from './getZoom';
import getCenterCoords from './getCenterCoords';
import TaxiOrderForm from '../TaxiOrderForm';
import TaxisBusy from './TaxisBusy';
import './Map.css';
import { Point } from 'ol/geom';
import locationIcon from "../../images/locationIcon.png"
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

  const coords2: Record<string, Coordinate> = {
    origin: [34.8291072 , 32.0864256],
    Montmartre: [34.9291072 , 32.0864256],
  };
  const [loc, setLoc] = React.useState(coords2.Montmartre);

  return (
    <div>
      <RMap
        className="w-[100%] h-[80vh] overflow-hidden "
        initial={{ center: userLocation ? fromLonLat(userLocation) : fromLonLat(centerCoords), zoom: zoom }}
      >
        <RLayerTile url='http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}' />
        <RLayerVector>
          {userLocation && <UserLocation userCoordinates={userLocation} />}
          <RFeature
            geometry={new Point(fromLonLat(loc))}
            // useCallback is here for performance reasons
            // without it RFeature will have its props updated at every call
            onPointerDrag={useCallback((e) => {
              const coords = e.map.getCoordinateFromPixel(e.pixel);
              e.target.setGeometry(new Point(coords));
              // this stops OpenLayers from interpreting the event to pan the map
              e.disablePropagation();
              return false;
            }, [])}
            onPointerDragEnd={useCallback((e) => {
              const coords = e.map.getCoordinateFromPixel(e.pixel);
              setLoc(toLonLat(coords));
            }, [])}
            onPointerEnter={useCallback(
              (e) =>
                (e.map.getTargetElement().style.cursor = "move") && undefined,
              []
            )}
            onPointerLeave={useCallback(
              (e) =>
                (e.map.getTargetElement().style.cursor = "initial") &&
                undefined,
              []
            )}
          >
            <RStyle.RStyle>
              <RStyle.RIcon src={locationIcon} scale={0.05} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <ROverlay className="example-overlay">Move me</ROverlay>
          </RFeature>
        </RLayerVector>
        <TaxisBusy availability={TaxiAvailability.Available} />
        <TaxisBusy availability={TaxiAvailability.Busy} />
      </RMap>

      <button

        onClick={handleOrderButtonClick}
        className="flex w-full justify-center  bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      >
        Order a taxi
      </button>
      <p>
        Pin location is{" "}
        <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
      </p>
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
