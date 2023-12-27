import { getUsersDal } from '../dal/dal';

export const getUsersService = async () => {
  try {
    const cars = await getUsersDal();
    return cars;
  } catch (error) {
    console.error('Error fetching all cars:', error);
    throw error;
  }
};