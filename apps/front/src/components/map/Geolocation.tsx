import { useMemo, useState } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import { RMap, RLayerTile } from 'rlayers';
import TaxisBusy from './TaxisBusy';
import { TaxiAvailability } from '../../types';
import TaxiOrderForm from '../TaxiOrderForm';
import getZoom from './getZoom';
import getCenterCoords from './getCenterCoords';
import { coords } from '../dataCoords';
import './Map.css';
import { useCallback } from 'react';
import { Geometry, Point } from 'ol/geom';
import { Geolocation as OLGeoLoc } from 'ol';
import { RLayerVector, RFeature, RGeolocation, RStyle, useOL } from 'rlayers';
import locationIcon from '../../images/locationIcon.png';
import './Map.css';
import TheNearestTaxi from './TheNearestTaxi';
import { Coordinate } from 'ol/coordinate';

function GeolocComp(): JSX.Element {
  const [pos, setPos] = useState<Point>(new Point([0, 0]));
  const [accuracy, setAccuracy] = useState<Geometry | undefined>(undefined);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);

  const { map } = useOL();

  const handleGeolocationChange = useCallback(
    (e: { target: OLGeoLoc }) => {
      const geoloc = e.target as OLGeoLoc;
      const position = geoloc.getPosition();

      // המיקום הנוכחי בשיטה של קוארדינטות
      // navigator.geolocation.getCurrentPosition((position) => {
      //   setUserLocation([
      //     position.coords.longitude,
      //     position.coords.latitude,
      //   ]);
      //   console.log("yyyyyyyyyyyyyyyyyyyyyyy", position.coords.longitude, position.coords.latitude);
      // });

      const accuracyGeometry = geoloc.getAccuracyGeometry();

      if (position) {
        setPos(new Point(position));
      }

      if (accuracyGeometry !== null) {
        setAccuracy(accuracyGeometry);

        if (accuracyGeometry.getType() === 'Polygon') {
          map.getView().fit(accuracyGeometry, {
            duration: 2500,
            maxZoom: 15,
          });
        }
      }
    },
    [map]
  );
  console.log(
    toLonLat(pos.getCoordinates())[1],
    toLonLat(pos.getCoordinates())[0]
  );
  return (
    <>
      <RGeolocation
        tracking={true}
        trackingOptions={{ enableHighAccuracy: true }}
        onChange={handleGeolocationChange}
      />
      <RLayerVector zIndex={10}>
        <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} scale={0.08} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        <RFeature geometry={pos}></RFeature>
        {accuracy && <RFeature geometry={accuracy}></RFeature>}
        <TheNearestTaxi long={toLonLat(pos.getCoordinates())[1]} lat={toLonLat(pos.getCoordinates())[0]} />
      </RLayerVector>
    </>
  );
}

export default function Geolocation(): JSX.Element {
  const points = coords.map((coord) => coord.coordinates);
  const centerCoords = useMemo(() => getCenterCoords(points), [points]);
  const zoom = useMemo(() => getZoom(points), [points]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
  };

  const handleOrderFormClose = () => {
    setShowOrderForm(false);
  };
  return (
    <>
      <RMap
        className="w-[100%] h-[92dvh]"
        initial={{ center: fromLonLat(centerCoords), zoom: zoom }}
      >
        <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
        <TaxisBusy availability={TaxiAvailability.Busy} />
        <TaxisBusy availability={TaxiAvailability.Available} />
        <GeolocComp />
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
    </>
  );
}
