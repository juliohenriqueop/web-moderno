module.exports = function(app) {
  const knex = app.configuration['knex-connection']

  const usersTable = process.env.SQL_DATABASE_TABLE_USERS
  const articlesTable = process.env.SQL_DATABASE_TABLE_ARTICLES

  async function create(user) {
    const queryResult = await knex(usersTable)
      .insert(user)
      .returning('id')
      .catch(error => {
        throw error
      })

    const userId = queryResult[0]
    return userId
  }

  async function update(user) {
    const updatedUsers = await knex(usersTable)
      .update(user)
      .where('id', user.id)
      .whereNull('deleted_at')
      .catch(error => {
        throw error
      })

    const updatedUser = {
      notFound: updatedUsers <= 0
    }

    return updatedUser
  }

  async function findByEmail(email) {
    const queryResult = await knex(usersTable)
      .select('id')
      .where('email', email)
      .whereNull('deleted_at')
      .first()
      .catch(error => {
        throw error
      })

    const user = {
      id: queryResult?.id,
      exists: (Boolean(queryResult?.id) === true)
    }

    return user
  }

  async function findRepeatedEmail(id, email) {
    const queryResult = await knex(usersTable)
      .select('id')
      .where('email', email)
      .whereNot('id', id)
      .first()
      .catch(error => {
        throw error
      })

    const user = {
      id: queryResult?.id,
      exists: (Boolean(queryResult?.id) === true)
    }

    return user
  }

  async function getCredentialsByEmail(email) {
    const queryResult = await knex
      .select('id', 'name', 'email', 'password', 'admin')
      .from(usersTable)
      .where('email', email)
      .whereNull('deleted_at')
      .first()
      .catch(error => {
        throw error
      })

    const user = {
      id: queryResult?.id,
      name: queryResult?.name,
      email: queryResult?.email,
      password: queryResult?.password,
      admin: queryResult?.admin,
      notFound: (Boolean(queryResult?.id) === false)
    }

    return user
  }

  async function getAll() {
    const users = await knex(usersTable)
      .select('id', 'name', 'email', 'admin')
      .whereNull('deleted_at')
      .orderBy('id')
      .catch(error => {
        throw error
      })

    return users
  }

  async function getById(id) {
    const queryResult = await knex(usersTable)
      .select('id', 'name', 'email', 'admin')
      .where('id', id)
      .whereNull('deleted_at')
      .first()
      .catch(error => {
        throw error
      })

    const user = {
      id: queryResult?.id,
      email: queryResult?.email,
      admin: queryResult?.admin,
      notFound: (Boolean(queryResult?.id) === false)
    }

    return user
  }

  async function count() {
    const queryResult = await knex(usersTable)
      .count('id')
      .whereNull('deleted_at')
      .first()
      .catch(error => {
        throw error
      })

    const countAsNumber = parseInt(queryResult.count)
    return countAsNumber
  }

  async function hasArticles(id) {
    const queryResult = await knex({
        user: usersTable
      })
      .leftOuterJoin({
        article: articlesTable
      }, 'article.author_id', 'user.id')
      .select(
        'user.id as userId',
        'article.id as articleId'
      )
      .where('user.id', id)
      .whereNull('deleted_at')
      .first()
      .catch(error => {
        throw error
      })

    const result = {
      notFound: (Boolean(queryResult?.userId) === false),
      hasArticles: (Boolean(queryResult?.articleId) === true)
    }

    return result
  }

  async function softDelete(id) {
    const queryUserArticle = knex(articlesTable)
      .select('id')
      .where('author_id', id)
      .first()

    const deletedUsers = await knex(usersTable)
      .update('deleted_at', knex.fn.now())
      .where('id', id)
      .whereNull('deleted_at')
      .whereNotExists(queryUserArticle)
      .catch(error => {
        throw error
      })

    return deletedUsers
  }

  async function undelete(id) {
    const undeletedUsers = await knex(usersTable)
      .update('deleted_at', null)
      .where('id', id)
      .catch(error => {
        throw error
      })

    return undeletedUsers
  }

  async function setPermissions(id, admin) {
    const updatedUsers = await knex(usersTable)
      .update('admin', admin)
      .where('id', id)
      .catch(error => {
        throw error
      })

    const user = {
      notFound: updatedUsers <= 0
    }

    return user
  }

  return {
    create,
    update,
    findByEmail,
    findRepeatedEmail,
    getCredentialsByEmail,
    getAll,
    getById,
    count,
    hasArticles,
    softDelete,
    undelete,
    setPermissions
  }
}