import { User } from '../db/models/userModel';
import { sequelizeConnect } from '../db/sequelizeConnection';


export const getUsersDal = async () => {
  try {
    await sequelizeConnect.sync();
    const getAllData = await User.findAll({ raw: true });
    console.log(getAllData);;
    return getAllData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};