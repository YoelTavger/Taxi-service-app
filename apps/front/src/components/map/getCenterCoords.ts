import { Coordinate } from 'ol/coordinate';

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

export default getCenterCoords;
