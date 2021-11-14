const faker = require('faker')
const passwordEncrypter = require('../src/authentication/password-cypher')

exports.seed = async function (knex) {
  faker.locale = 'pt_BR'

  await knex('users').del()

  const fakeUsers = []

  fakeUsers.push({
    name: 'Administrador',
    email: 'admin@email.com',
    password: await passwordEncrypter().encryptPassword('123456'),
    admin: true,
  })

  for (let userIndex = 2; userIndex < 20; userIndex++) {
    fakeUsers.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: await passwordEncrypter().encryptPassword('123456'),
      admin: false,
    })
  }

  return await knex('users').insert(fakeUsers);
};