const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust the path as needed

const Note = sequelize.define('note', { // Changed model name to 'note'
    id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    important: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'note', // Explicitly specify the table name
    timestamps: true, // Enable automatic createdAt and updatedAt fields
});

module.exports = Note;
