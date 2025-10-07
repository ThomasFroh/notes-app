const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const notesRouter = require('./controllers/notesController')
const usersRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app