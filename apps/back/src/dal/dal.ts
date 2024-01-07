import { User } from '../db/models/userModel';
import { sequelizeConnect } from '../db/sequelizeConnection';
import { UserType } from '../types';

export const getUsersDal = async () => {
  try {
    await sequelizeConnect.sync();
    const getAllData = await User.findAll({ raw: true });
    console.log(getAllData);
    return getAllData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUpUserDal = async (input: UserType) => {
  try {
    const { name, email, password } = input;
    const user = await User.create({ name, email, password });
    return Boolean(user);
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}















// export const signUpUserDal = async (userData: UserType) => {
//   try {
//     const { name, email, password } = userData;
//     const user = await User.create({ name, email, password });
//     return user;
//   } catch (error) {
//     console.error('Error signing up:', error);
//     throw error;
//   }
// };

// export const signInUserDal = async (userData: UserType) => {
//   try {
//     const { email, password } = userData;
//     const user = await User.findOne({ where: { email, password } });
//     if (!user) {
//       throw new Error('User not found or incorrect password');
//     }
//     return user;
//   } catch (error) {
//     console.error('Error signing in:', error);
//     throw error;
//   }
// };
