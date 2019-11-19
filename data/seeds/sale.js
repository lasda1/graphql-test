
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {id: 1, name: '001',amount: 5.6,user_id:'1'},
        {id: 2, name: '002',amount: 4,user_id:'2'},
        {id: 3, name: '004',amount: 8,user_id:'2'}
      ]);
    });
};