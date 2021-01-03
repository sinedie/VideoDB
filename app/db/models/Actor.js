const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Actor extends Model {

}


Actor.init({
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
    Actor
}