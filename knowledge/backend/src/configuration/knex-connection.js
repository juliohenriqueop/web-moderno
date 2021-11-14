const knexConfig = require('./knexfile')

module.exports = function(app) {
  const knex = require('knex')(knexConfig)
  return knex
}