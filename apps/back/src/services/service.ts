import { getActiveTaxiDataDal, getBusyTaxiDataDal, getUsersDal, signInUserDal, signUpUserDal } from '../dal/dal';
import { User } from '../db/models/userModel';
import { signUpSchemaType } from '../zod/zodSchema';

export const getUsersService = async () => {
  try {
    const users = await getUsersDal();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const signUpUserService = async ( {input}: {input: signUpSchemaType} ) => {
    const { user_name, password, email, full_name, phone_number} = input;
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      const error = new Error('User already exists');
      throw error;
    }
    const user = await signUpUserDal(user_name, password, email, full_name, phone_number);
    return user;
};

export const signInUserService = async ({ input }) => {
  try {
    const { user_name, password } = input;
    const existingUser = await User.findOne({ where: { user_name } });
    if (!existingUser) {
      const error = new Error('User does not exist');
      throw error;
    }
    const isPasswordValid = await signInUserDal(user_name, password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      throw error;
    }
    return existingUser;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};

export const getActiveTaxiDataService = async () => {
  try {
    const activeTaxis = await getActiveTaxiDataDal();
    return activeTaxis;
  } catch (error) {
    console.error('Error fetching active taxis:', error);
    return {message: error.message,statusCode: 500}
    throw error;
  }
};

export const getBusyTaxiDataService = async () => {
  try {
    const busyTaxis = await getBusyTaxiDataDal();
    return busyTaxis;
  } catch (error) {
    console.error('Error fetching busy taxis:', error);
    throw error;
  }
};



