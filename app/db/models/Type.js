const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Type extends Model {
}


Type.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });


export {
    Type
}