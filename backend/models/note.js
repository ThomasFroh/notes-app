const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed

const Note = sequelize.define('note', { // Changed model name to 'note'
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
    tableName: 'note', // Explicitly specify the table name
    timestamps: false, // Disable automatic createdAt and updatedAt fields
});

module.exports = Note;
