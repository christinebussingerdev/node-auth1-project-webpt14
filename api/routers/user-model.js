const db = require('../data/dbConfig')

module.exports = {
  find,
  findBy,
  findById,
  createUser
}

function find() {
  return db('users')
}

function findBy(filter) {
	return db('users')
		.select('id', 'username', 'password')
		.where(filter)
}

function findById(id) {
  return db('users')
  .where(id)
  .select('id', 'username')
  .first()
}

async function createUser(newUser) {
  const [id] = await db('users')
  .insert(newUser)
  return findById(id)
}