import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Review extends Model {}

Review.init(
  {
    rating:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    reviewer: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    film: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },

  {
    sequelize: database, timestamps: false
  }
);

export default Review;
