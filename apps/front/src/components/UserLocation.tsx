import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { RLayerVector, RFeature, RStyle } from 'rlayers';
import locationIcon from '../images/userLocation-icon.png';

export const UserLocation = ({ userCoordinates }: { userCoordinates: Coordinate }) => {
  return (
    <RLayerVector zIndex={10001}>
      <RStyle.RStyle>
        <RStyle.RIcon src={locationIcon} scale={0.25} anchor={[0.5, 1]} />
      </RStyle.RStyle>
      <RFeature geometry={new Point(fromLonLat(userCoordinates))} />
    </RLayerVector>
  );
};