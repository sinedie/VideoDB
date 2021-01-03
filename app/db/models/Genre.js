const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Genre extends Model {
}


Genre.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });


export {
    Genre
}