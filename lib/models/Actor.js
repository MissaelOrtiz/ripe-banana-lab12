import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Actor extends Model {}

Actor.init(
  {
    name:  {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: database, timestamps: false
  }
);

export default Actor;
