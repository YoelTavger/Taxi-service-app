import { useEffect, useMemo, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import './map.css';
import { coords } from './dataCoords';

import { RMap, ROSM, RLayerVector, RFeature, RStyle } from 'rlayers';
import locationIcon from '../images/Taxi-icon.png';
import { UserLocation } from './UserLocation';

const Map = (): JSX.Element => {
  
  const getCenterCoords = (points: Coordinate[]): Coordinate => {
    const latitudes = points.map((point) => point[0]);
    const longitudes = points.map((point) => point[1]);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;

    return [centerLat, centerLon];
  };

  const getZoom = (points: Coordinate[]): number => {
    const extent = [
      Math.min(...points.map((point) => point[0])),
      Math.min(...points.map((point) => point[1])),
      Math.max(...points.map((point) => point[0])),
      Math.max(...points.map((point) => point[1])),
    ];

    const mapWidth = window.innerWidth;
    const mapHeight = window.innerHeight;
    const extentWidth = extent[2] - extent[0];
    const extentHeight = extent[3] - extent[1];

    const zoomWidth = Math.log2((360 * mapWidth) / (256 * extentWidth));
    const zoomHeight = Math.log2((180 * mapHeight) / (256 * extentHeight));

    return Math.floor(Math.min(zoomWidth, zoomHeight));
  };

  const points = coords.map((coord) => coord.coordinates);
  const centerCoords = useMemo(() => getCenterCoords(points), [points]);
  const zoom = useMemo(() => getZoom(points), [points]);

  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  return (
    <>
      <div>
        <RMap
          className="w-[60vh] h-[60vh] border-4 border-solid border-amber-500 rounded-[5%] overflow-hidden shadow-[0_0_10px]"
          initial={{ center: fromLonLat(centerCoords), zoom: zoom }}
        >
          <ROSM attributions="Yoel Tavger" opacity={0.9} />

          {userLocation && <UserLocation userCoordinates={userLocation} />}
          {coords.map((coord) => (
            <RLayerVector key={coord.name}>
              <RStyle.RStyle>
                <RStyle.RIcon
                  src={locationIcon}
                  scale={0.16}
                  anchor={[0.5, 0.8]}
                />
              </RStyle.RStyle>
              <RFeature
                geometry={new Point(fromLonLat(coord.coordinates))}
              ></RFeature>
            </RLayerVector>
          ))}
        </RMap>

        <button
          style={{
            boxShadow: '0  0 10px ',
          }}
          className="flex w-full justify-center rounded-md bg-amber-500 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          Order a taxi
        </button>
      </div>
    </>
  );
};

export default Map;
