const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Tag extends Model {
}


Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });


export {
    Tag
}