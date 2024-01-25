import { Sequelize } from 'sequelize';

export const sequelizeConnect = new Sequelize('postgres', 'postgres', '11235', {
  host: 'localhost',
  dialect: 'postgres',
});

export const sequelizeConnection = async () => {
  try {
    await sequelizeConnect.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};