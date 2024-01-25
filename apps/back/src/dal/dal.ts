import { Taxi } from '../db/models/taxiesModel';
import { Sequelize } from 'sequelize';


export const getTaxiByAvailabilityDal = async (availability: string) => {
  const data = (
    await Taxi.findAll({
      where: {
        availability: availability,
      },
    })
  ).map((taxi) => {
    return taxi.dataValues;
  });
  console.log(data);
  return data;
};

// SELECT *,
// SQRT(POW(latitude - current_location[0], 2) + POW(longitude - current_location[1], 2)) AS distance
// FROM taxis
// where availability = 'busy'
// ORDER BY distance
// LIMIT 1;

interface UserLocation {
  x?: number;
  y?: number;
}

export const getTheNearestTaxiDal = async (userLocation: UserLocation) => {
  const { x, y } = userLocation;

  const data = (
    await Taxi.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(
              `SQRT(POW(${x} - current_location[0], 2) + POW(${y} - current_location[1], 2))`
            ),
            'distance',
          ],
        ],
      },
      where: {
        availability: 'available',
      },
      order: Sequelize.literal('distance'),
      limit: 1,
    })
  ).map((taxi) => {
    return taxi.dataValues;
  });

  console.log(data);
  return data;
};


