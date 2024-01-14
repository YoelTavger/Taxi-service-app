import { sequelizeConnect } from "../sequelizeConnection";
import { DataTypes } from 'sequelize';

export const Ride = sequelizeConnect.define('Ride', {
  ride_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.UUID,
  },
  driver_id: {
    type: DataTypes.UUID,
  },
  taxi_id: {
    type: DataTypes.UUID,
  },
  pickup_location: {
    type: DataTypes.GEOMETRY('POINT'),
  },
  dropoff_location: {
    type: DataTypes.GEOMETRY('POINT'),
  },
  start_time: {
    type: DataTypes.DATE,
  },
  end_time: {
    type: DataTypes.DATE,
  },
  fare_amount: {
    type: DataTypes.DECIMAL,
  },
  driver_rating: {
    type: DataTypes.FLOAT,
  },
}, {
  tableName: 'rides',
  timestamps: false,
});

export default Ride;

