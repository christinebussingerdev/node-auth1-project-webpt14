
exports.up = function(knex) {
  knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.string('username').unique()
    tbl.string('password')
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users')
};
