const db = require('../data/dbConfig')

module.exports = {
  find,
  createUser
}

function find() {
  return db('users')
}

function findBy(query, data) {
  return db('users')
  .where(query, data)
  .first()
}

function createUser(newUser) {
  return db('users')
  .insert(newUser)
}