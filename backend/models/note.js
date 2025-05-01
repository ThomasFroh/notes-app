const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    important: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    timestamps: false, // Disable automatic createdAt and updatedAt fields
});

module.exports = Note;
