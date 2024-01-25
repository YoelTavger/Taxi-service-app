import { getTaxiByAvailabilityDal, getTheNearestTaxiDal } from '../dal/dal';

export const getTaxiByAvailabilityService = async (opts: { input: string; }) => {
  try {
    return await getTaxiByAvailabilityDal(opts.input);
  } catch (error) {
    console.error('error in getTaxiByAvailability', error);
    throw error;
  }
};

interface UserLocation {
  x?: number;
  y?: number;
}

export const getTheNearestTaxiService = async (opts: { input: UserLocation; }) => {
  try {
    return await getTheNearestTaxiDal(opts.input);
  } catch (error) {
    console.error('error in getTheNearestTaxi', error);
    throw error;
  }
};



