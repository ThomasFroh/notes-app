const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    // require('dotenv').config({ path: '/backend/.env.prod' })
    // Resolve the absolute path to your .env file
    const envPath = path.resolve(__dirname, '../.env.prod') // adjust as needed
    dotenv.config({ path: envPath })
} else {
    console.log('Loading local environment variables...')
    // require('dotenv').config({ path: '/backend/.env.local' })
    // Resolve the absolute path to your .env file
    const envPath = path.resolve(__dirname, '../.env.local') // adjust as needed
    dotenv.config({ path: envPath })
}

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = { DB_HOST, DB_USER, DB_PASSWORD, PORT, NODE_ENV }