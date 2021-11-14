exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id').primary()
    table.string('title').notNull()
    table.string('description', 1000).notNull()
    table.string('thumbnail_url')
    table.binary('content').notNull()
    table.integer('author_id').references('id').inTable('users').notNull()
    table.integer('category_id').references('id').inTable('categories').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles')
};