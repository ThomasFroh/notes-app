const { Sequelize } = require('sequelize');
const mysql = require('mysql2')
if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: '.env.prod' })
} else {
    require('dotenv').config({ path: '.env.local' })
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql2',
});

module.exports = sequelize;

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   });

// module.exports = connection