
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'firstUser', password: 'abc123'},
        {id: 2, username: 'secondUser', password: '123abc'},
        {id: 3, username: 'thirdUser', password: 'thirdpass123'}
      ]);
    });
};
