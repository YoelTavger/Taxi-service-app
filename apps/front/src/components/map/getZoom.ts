import { Coordinate } from 'ol/coordinate';

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

export default getZoom;
