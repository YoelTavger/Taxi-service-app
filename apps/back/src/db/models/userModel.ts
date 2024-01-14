import { sequelizeConnect } from "../sequelizeConnection";
import { DataTypes, Sequelize } from 'sequelize';

export const User = sequelizeConnect.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING(50),
    defaultValue: "user"
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'users',
  timestamps: false,
});