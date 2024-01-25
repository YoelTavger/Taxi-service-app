import useGetTheNearestTaxi from './useGetTheNearestTaxi';



interface coords {
  long: number;
  lat: number;
}

const TheNearestTaxi = (coord: coords) => {
  console.log(coord.long, coord.lat);
  const data = useGetTheNearestTaxi( coord.long, coord.lat);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Taxi Model: {data[0].model}</p>
      <p>License Plate: {data[0].license_plate}</p>
      <p>coord: {data[0].current_location.x}, {data[0].current_location.y}</p>
    </div>
  );
};

export default TheNearestTaxi;