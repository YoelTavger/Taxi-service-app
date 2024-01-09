import { error } from 'console';
import { getUsersDal, signUpUserDal } from '../dal/dal';
import { User } from '../db/models/userModel';

export const getUsersService = async () => {
  try {
    const users = await getUsersDal();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const signUpUserService = async ({ input }) => {
  try {
    const { user_name, password, email, phone_number, created_at} = input;
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      const error = new Error('User already exists');
      error.message = 'User already exists';
      (error as any).status = 409;
      throw error;
    }
    const user = await signUpUserDal(user_name, password, email, phone_number, created_at);
    return user;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
};
