const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const notesRouter = require('./controllers/notesController')
const logger = require('./utils/logger')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/notes', notesRouter)

module.exports = app