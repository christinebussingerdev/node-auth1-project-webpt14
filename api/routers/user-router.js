const express = require('express')
const bcrypt = require('bcryptjs')

const db = require('./user-model')
const userAuth = require('../middleware/userAuth')

const user = express.Router()

// public vars
const authError = {msg: 'invalid credentials'}

// get all users
user.get('/users', userAuth(), (req, res, next) => {
  db.find()
  .then(users => res.status(200).json(users))
  .catch(err => next(err))
})

user.post('/register', (req, res, next) => {
  const {username, password} = req.body

  const newUser = db.createUser({
    username,
    password: brypt.hash(password, 10)
  })

  .then(() => res.status(201).json({msg: 'user created'}))
  .catch(err => next(err))
})

user.post('/login', async(req, res, next) => {
  try {
    const {username, password} = req.body
    
    //check for empty fields
    if (!username || !password) {
      res.status(401).json(authError)
    }
    // query database for user
    const user = await db.findBy({username}).first()

    if(!user) {
      res.status(401).json(authError)
    }

    // check password
    const checkForValidPassword = await bcrypt.compare(password, user.password)

    if (!checkForValidPassword) {
      res.status(401).json(authError)
    }

    req.session.user = user
    
  } 
  catch(err) {next()}
})

module.exports = user