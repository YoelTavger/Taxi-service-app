import { useMemo } from 'react';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import './map.css';

import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from 'rlayers';
import locationIcon from './location.png';

const coords = [
  { name: 'beitHamikdash', coordinates: [35.2354, 31.7767] },
  { name: 'seaOfGalilee', coordinates: [35.5575, 32.8064] },
  { name: 'Herzliya', coordinates: [34.8364, 32.1656] },
  { name: 'Masada', coordinates: [35.3536, 31.3155] },
  { name: 'DeadSea', coordinates: [35.4933, 31.4969] },
  { name: 'TelAviv', coordinates: [34.7818, 32.0853] },
  { name: 'WesternWall', coordinates: [35.2344, 31.7767] },
  { name: 'Haifa', coordinates: [34.9896, 32.7940] },
  { name: 'MountCarmel', coordinates: [35.1043, 32.7006] },
  { name: 'Caesarea', coordinates: [34.9044, 32.4985] },
  { name: 'Acre', coordinates: [35.0827, 32.9273] },
  { name: 'Jericho', coordinates: [35.4444, 31.8593] },
  { name: 'Tiberias', coordinates: [35.5285, 32.7955] },
  { name: 'Jaffa', coordinates: [34.7553, 32.0549] },
  { name: 'Safed', coordinates: [35.4945, 32.9707] },
  { name: 'RoshHanikra', coordinates: [35.0986, 33.0902] },
  { name: 'BeitShean', coordinates: [35.5007, 32.5006] },
  { name: 'MountTabor', coordinates: [35.4072, 32.7037] },
  { name: 'ZikhronYaakov', coordinates: [34.9533, 32.5751] },
  { name: 'HulaValley', coordinates: [35.6054, 33.0942] },
  { name: 'Nahariya', coordinates: [35.0943, 33.0059] },
  { name: 'BetShearim', coordinates: [35.1997, 32.6633] },
  { name: 'MountHermon', coordinates: [35.8322, 33.2827] },
  { name: 'YarkonPark', coordinates: [34.7857, 32.0847] },
  { name: 'YadVashem', coordinates: [35.2042, 31.7774] },
  { name: 'BenGurionAirport', coordinates: [34.8854, 32.0055] },
  { name: 'RamatGanSafari', coordinates: [34.8148, 32.0658] },
  { name: 'EinGedi', coordinates: [35.3882, 31.4461] },
  { name: 'YadMordechai', coordinates: [34.5567, 31.5857] },
  { name: 'AyalonInstitute', coordinates: [34.8259, 32.0450] },
]

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

  return (
    <RMap
      className="example-map"
      initial={{ center: fromLonLat(centerCoords), zoom: zoom }}
    >
      <ROSM />
      <>
        {coords.map((coord) => (
          <RLayerVector key={coord.name} zIndex={10000}>
            <RStyle.RStyle>
              <RStyle.RIcon src={locationIcon} scale={0.1} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <RFeature geometry={new Point(fromLonLat(coord.coordinates))}>
              {/* <ROverlay className="example-overlay">
                <div className="text-amber-500">{coord.name}</div>
              </ROverlay> */}
            </RFeature>
          </RLayerVector>
        ))}
      </>
    </RMap>
  );
};

export default Map;
