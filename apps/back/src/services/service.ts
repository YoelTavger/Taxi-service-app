import { getUsersDal, signUpUserDal } from '../dal/dal';

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
    const { user_name, password, email, phone_number } = input;
    const user = await signUpUserDal(user_name, password, email, phone_number);
    return user;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
};
