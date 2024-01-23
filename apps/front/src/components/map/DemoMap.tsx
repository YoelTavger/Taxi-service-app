import { useCallback, useMemo, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Geometry, Point} from 'ol/geom';
import { Geolocation as OLGeoLoc } from 'ol';
import {
  RMap,
  RLayerVector,
  RFeature,
  RGeolocation,
  RStyle,
  useOL,
  RLayerTile,
} from 'rlayers';
import locationIcon from '../../images/locationIcon.png';
import TaxisBusy from './TaxisBusy';
import { TaxiAvailability } from '../../types';
import TaxiOrderForm from '../TaxiOrderForm';
import getZoom from './getZoom';
import getCenterCoords from './getCenterCoords';
import { coords } from '../dataCoords';
import './Map.css';

function GeolocComp(): JSX.Element {
  const [pos, setPos] = useState<Point>(new Point([0, 0]));
  const [accuracy, setAccuracy] = useState<Geometry | undefined>(undefined);

  // Low-level access to the OpenLayers API
  const { map } = useOL();

  const handleGeolocationChange = useCallback(
    (e: { target: OLGeoLoc }) => {
      const geoloc = e.target as OLGeoLoc;
      const position = geoloc.getPosition();
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
  console.log('pos', pos);
  console.log('accuracy', accuracy);

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
        className="w-[100%] h-[92vh]"
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
