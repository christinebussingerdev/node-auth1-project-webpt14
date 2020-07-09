const express = require('express')
const cors = require('CORS')
const session = require('express-session')

const server = express()

// import routers
const userRouter = require('./routers/user-router')

server.use(express.json())
server.use(cors())
server.use(session({
  resave: false, //avoids remaking unchanged sessions
  saveUninitialized: false, //gpr law compliance
  secret: 'cake'
}))

// err mw
server.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({msg: 'something went wrong...'})
})

// init routers
server.use('/api', userRouter)


module.exports = server