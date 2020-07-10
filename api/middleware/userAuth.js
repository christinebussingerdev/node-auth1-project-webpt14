const bcrypt = require('bcryptjs')
const users = require('../routers/user-model')

// public vars
const authError = {msg: 'invalid credentials'}

function authenticateUser() {
  return async (req, res, next) => {
    try {
      // const {username, password} = req.headers
      
      // // check for empty
      // if (!username || !password) {
      //   res.status(401).json(authError)
      // }
      // // query database for user
      // const user = await db.findBy({username}).first()

      // if(!user) {
      //   res.status(401).json(authError)
      // }

      // // check password
      // const checkForValidPassword = await bcrypt.compare(password, user.password)
  
      // if (!checkForValidPassword) {
      //   res.status(401).json(authError)
      // } else {
      //   res.json({msg: `Welcome ${user.username}`})
      // }

      if (!req.session || !req.session.user) {
        res.status(401).json(authError)
      }
  
      next()

    }
    catch(err) {next(err)}

  }
}

module.exports = authenticateUser