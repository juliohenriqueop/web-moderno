exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', table => {
    table.increments('id')
    table.string('name').notNull()
    table.integer('parent_id').references('id').inTable('categories')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
};