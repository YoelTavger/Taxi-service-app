import { sequelizeConnect } from "../sequelizeConnection";

const { Sequelize, DataTypes } = require('sequelize');

export const User = sequelizeConnect.define('User', {
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdat: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'users',
  timestamps: false,
});