const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const savedUser = await User.create({
    username,
    passwordHash,
  })

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()
  response.json(users)
})

module.exports = usersRouter