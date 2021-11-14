const faker = require('faker')

exports.seed = async function (knex) {
  faker.locale = 'pt_BR'

  await knex('categories').del()

  const fakeCategories = []

  for (let categoryIndex = 1; categoryIndex < 20; categoryIndex++) {
    fakeCategories.push({
      name: faker.random.words(),
      parent_id: null,
    })
  }

  return await knex('categories').insert(fakeCategories);
};