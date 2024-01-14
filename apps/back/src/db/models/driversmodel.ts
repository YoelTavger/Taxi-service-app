import { sequelizeConnect } from "../sequelizeConnection";
import { DataTypes } from 'sequelize';

export const Driver = sequelizeConnect.define('Driver', {
  driver_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  license_plate: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  driver_rating: {
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'drivers',
  timestamps: false,
});

export default Driver;
