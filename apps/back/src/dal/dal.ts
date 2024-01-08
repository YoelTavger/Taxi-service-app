import { UUIDV4 } from 'sequelize';
import { User } from '../db/models/userModel';
import { sequelizeConnect } from '../db/sequelizeConnection';

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

export const signUpUserDal = async ( user_name, password, email, phone_number) => {
  try {
    await User.sync();
    const newUser = await User.create({
      user_id: UUIDV4(),
      user_name: user_name,
      password: password,
      email: email,
      phone_number: phone_number,
    },
    {
      fields: ['user_id', 'user_name', 'password', 'email', 'phone_number'],
    });
    return newUser;
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

