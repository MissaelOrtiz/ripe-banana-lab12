import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Studio extends Model {}

Studio.init(
    {
        name:  { 
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    
    {
        sequelize: database, timestamps: false
    }
)