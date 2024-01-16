import { getTaxiByAvailabilityDal, getUsersDal, signInUserDal, signUpUserDal } from '../dal/dal';
import { User } from '../db/models/userModel';
import { signUpSchemaType, SignInSchemaType } from '../zod/zodSchema';

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
    const { user_name } = input;
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      const error = new Error('User already exists');
      throw error;
    }
    const user = await signUpUserDal(input);
    return user;
};
export const signInUserService = async ({ input }: { input: SignInSchemaType }) => {
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
export const getTaxiByAvailabilityService = async (res: { input: string; }) => {
  try {
    return await getTaxiByAvailabilityDal(res.input);
  } catch (error) {
    console.error('error in getTaxiByAvailability', error);
    throw error;
  }
};







