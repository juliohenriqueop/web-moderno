const faker = require('faker')

exports.seed = async function (knex) {
  faker.locale = 'pt_BR'

  await knex('articles').del()

  const fakeArticles = []

  for (let currentIndex = 1; currentIndex < 20; currentIndex++) {
    fakeArticles.push({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      thumbnail_url: faker.image.imageUrl(),
      content: faker.lorem.paragraphs(),
      author_id: currentIndex,
      category_id: currentIndex
    })
  }

  return await knex('articles').insert(fakeArticles);
};