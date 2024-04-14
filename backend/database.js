const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'notes_database',
    user: 'root',
    password: 'root',
})

module.exports = connection