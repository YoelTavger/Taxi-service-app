import { useCallback, useState } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import { RFeature, ROverlay, RStyle } from 'rlayers';
import { Point } from 'ol/geom';
import locationIcon from '../../images/taxiRedicon.png';
import { Coordinate } from 'ol/coordinate';

export const MoveMe = () => {
  const coords2: Record<string, Coordinate> = {
    origin: [34.8291072, 32.0864256],
    Montmartre: [34.9291072, 32.0864256],
  };
  const [loc, setLoc] = useState(coords2.Montmartre);
  return (
    <>
      <RFeature
        geometry={new Point(fromLonLat(loc))}
        onPointerDrag={useCallback((e) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          e.target.setGeometry(new Point(coords));
          e.disablePropagation();
          return false;
        }, [])}
        onPointerDragEnd={useCallback((e) => {
          const coords = e.map.getCoordinateFromPixel(e.pixel);
          setLoc(toLonLat(coords));
        }, [])}
        onPointerEnter={useCallback(
          (e) => (e.map.getTargetElement().style.cursor = 'move') && undefined,
          []
        )}
        onPointerLeave={useCallback(
          (e) =>
            (e.map.getTargetElement().style.cursor = 'initial') && undefined,
          []
        )}
      >
        <RStyle.RStyle>
          <RStyle.RIcon src={locationIcon} scale={0.4} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        <ROverlay className="example-overlay text-black">Move me</ROverlay>
      </RFeature>
      <p>
        Pin location is{' '}
        <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
      </p>
    </>
  );
};
