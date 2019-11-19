
exports.up = function(knex) {
    return knex.schema.createTable("sales", tbl => {
        tbl.increments();
        tbl.text("name", 128).notNullable();
        tbl.float('amount', 6, 2);
        tbl.foreign('user_id').references('id').inTable('users')
    });
};

exports.down = function(knex) {
  
};
