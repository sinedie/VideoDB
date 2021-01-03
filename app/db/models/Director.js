const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Director extends Model {

}


Director.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });


export {
    Director
}