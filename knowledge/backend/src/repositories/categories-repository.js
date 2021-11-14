module.exports = function (app) {
  const knex = app.configuration['knex-connection']

  const categoriesTable = process.env.SQL_DATABASE_TABLE_CATEGORIES
  const articlesTable = process.env.SQL_DATABASE_TABLE_ARTICLES

  async function create(category) {
    const queryResult = await knex(categoriesTable)
      .insert(category)
      .returning('id')
      .catch(error => {
        throw error
      })

    const categoryId = queryResult[0]
    return categoryId
  }

  async function update(category) {
    const queryResult = await knex(categoriesTable)
      .update(category)
      .where('id', category.id)
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function getAll() {
    const queryResult = await knex(categoriesTable)
      .select('id', 'name', 'parent_id')
      .orderBy('id')
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function findByName(name) {
    const queryResult = await knex(categoriesTable)
      .select('id')
      .where('name', name)
      .first()
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function findById(id) {
    const queryResult = await knex(categoriesTable)
      .select('id')
      .where({
        id: id
      })
      .first()
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function findEqual(category) {
    const queryResult = await knex(categoriesTable)
      .select('id')
      .where('id', category.parent_id)
      .orWhere('name', category.name)
      .andWhere('parent_id', category.parent_id)
      .limit(2)
      .catch(error => {
        throw error
      })

    function isParentCategory({
      id
    }) {
      return id === category.parent_id
    }

    function isRepeatedCategory({
      id
    }) {
      return id !== category.parent_id
    }

    const repeatedCategoryId = queryResult?.find(isRepeatedCategory)?.id
    const parentCategoryId = queryResult?.find(isParentCategory)?.id

    const repeatedCategory = {
      id: repeatedCategoryId,
      exists: (Boolean(repeatedCategoryId) === true),
      parentNotFound: (Boolean(parentCategoryId) === false)
    }

    return repeatedCategory
  }

  async function hasChildren(id) {
    const queryChildrenArticle = knex(articlesTable)
      .select('id', 'category_id')
      .where('category_id', id)
      .first()

    const queryResult = await knex({
      category: categoriesTable
    })
      .leftOuterJoin({
        childrenArticle: queryChildrenArticle
      },
        'childrenArticle.category_id', 'category.id')
      .select(
        'category.id as categoryId',
        'childrenArticle.id as childrenArticleId'
      )
      .where('category.id', id)
      .orWhere('category.parent_id', id)
      .limit(2)
      .catch(error => {
        throw error
      })

    function isParentCategory({
      categoryId
    }) {
      return categoryId === id
    }

    const parentCategory = queryResult?.find(isParentCategory)

    const childrenCategoryExists = queryResult?.length > 1
    const childrenArticleExists = (Boolean(parentCategory?.childrenArticleId) === true)

    const category = {
      notFound: (Boolean(parentCategory?.categoryId) === false),
      hasChildren: childrenCategoryExists || childrenArticleExists
    }

    return category
  }

  async function remove(id) {
    await knex(categoriesTable)
      .where('id', id)
      .del()
      .catch(error => {
        throw error
      })
  }

  async function count() {
    const queryResult = await knex(categoriesTable)
      .count('id')
      .first()
      .catch(error => {
        throw error
      })

    const countAsNumber = parseInt(queryResult.count)
    return countAsNumber
  }

  return {
    create,
    update,
    getAll,
    findByName,
    findById,
    findEqual,
    hasChildren,
    remove,
    count
  }
}