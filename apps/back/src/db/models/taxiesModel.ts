import { TaxiAttributes } from "../../types";
import { sequelizeConnect } from "../sequelizeConnection";
import { DataTypes, Model } from "sequelize";

export const Taxi = sequelizeConnect.define<Model<TaxiAttributes>>('taxis', {
  taxi_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  license_plate: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  current_location: {
    type: DataTypes.GEOMETRY('POINT'),
  },
  availability: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'taxis',
  timestamps: false,
});

export default Taxi;

