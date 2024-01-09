import { v4 as uuidv4 } from 'uuid';
import { User } from '../db/models/userModel';
import { sequelizeConnect } from '../db/sequelizeConnection';
import { DATE } from 'sequelize';

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

export const signUpUserDal = async ( user_name, password, email, phone_number, created_at) => {
  try {
    await User.sync();
    const newUser = await User.create({
      user_id: uuidv4(),
      user_name: user_name,
      password: password,
      email: email,
      phone_number: phone_number,
      created_at: new DATE(),
    },
    {
      fields: ['user_id', 'user_name', 'password', 'email', 'phone_number'],
    });
    return newUser;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

