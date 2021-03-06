import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Film extends Model {}

Film.init(
  {
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
  },

  {
    sequelize: database, timestamps: false
  }
);

export default Film;
