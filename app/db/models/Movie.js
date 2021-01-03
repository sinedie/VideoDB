const { Model, DataTypes } = require('sequelize');
import { sequelize } from '../db'


class Movie extends Model {
    // static classLevelMethod() {
    //     return 'foo';
    // }
    // instanceLevelMethod() {
    //     return 'bar';
    // }
    // getFullname() {
    //     return [this.title, this.date].join(' ');
    // }
}


Movie.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // director: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.BLOB
    },
    overview: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize });


export {
    Movie
}