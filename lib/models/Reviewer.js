import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Reviewer extends Model {}

Reviewer.init(
  {
    name:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: database, timestamps: false
  }
);

export default Reviewer;
