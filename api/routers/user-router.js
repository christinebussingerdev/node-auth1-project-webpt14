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


user.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body

    const existingUser = await db.findBy({username}).first()

    if (existingUser) {
      return res.status(409).json({msg: 'username taken'})
    }

    const newUser = await db.createUser({
      username,
      password: await bcrypt.hash(password, 10)
    })
    
    if (newUser) {res.status(201).json({msg: 'success'})}

  }
  catch(err) {next(err)}
})


user.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body
    

    // query database for user
    const user = await db.findBy({username}).first()

    if(!user) {
      return res.status(401).json(authError)
    }

    // check password
    const checkForValidPassword = await bcrypt.compare(password, user.password)

    if (!checkForValidPassword) {
      return res.status(401).json(authError)
    }

    req.session.user = user
    
    res.json({msg: `welcome ${user.username}`})
  } 
  catch(err) {next()}
})

user.get('/logout', async (req, res, next) => {
  try {
    req.session.destroy(err => {
      if (err) {next(err)}
      else {res.sendStatus(204)}
    })
  } catch(err) {next(err)}
})

module.exports = user