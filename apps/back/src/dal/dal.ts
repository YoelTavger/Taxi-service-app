import { v4 as uuidv4 } from 'uuid';
import { User } from '../db/models/userModel';
import { sequelizeConnect } from '../db/sequelizeConnection';
import { DATE } from 'sequelize';
import Taxi from '../db/models/taxiesModel';

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

export const signUpUserDal = async ( user_name, password, email, full_name, phone_number) => {
  try {
    await User.sync();
    const newUser = await User.create({
      user_id: uuidv4(),
      user_name: user_name,
      password: password,
      email: email,
      full_name: full_name,
      phone_number: phone_number,
      created_at: new DATE(),
    },
    {
      fields: ['user_id', 'user_name', 'password', 'email', 'full_name', 'phone_number'],
    });
    return newUser;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signInUserDal = async (user_name, password) => {
  try {
    await User.sync();
    const user = await User.findOne({
      where: {
        user_name: user_name,
        password: password,
      },
    });
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const getActiveTaxiDataDal = async () => {
  try {
    await sequelizeConnect.sync();
    const data = await Taxi.findAll({
      where: {
        availability: "Available",
      },
      raw: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBusyTaxiDataDal = async () => {
  try {
    await sequelizeConnect.sync();
    const data = await Taxi.findAll({
      where: {
        availability: "Busy",
      },
      raw: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

