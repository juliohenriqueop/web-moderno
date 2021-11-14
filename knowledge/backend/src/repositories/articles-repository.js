module.exports = function (app) {
  const knex = app.configuration['knex-connection']

  const articlesTable = process.env.SQL_DATABASE_TABLE_ARTICLES
  const categoriesTable = process.env.SQL_DATABASE_TABLE_CATEGORIES
  const usersTable = process.env.SQL_DATABASE_TABLE_USERS

  async function create(article) {
    const queryResult = await knex(articlesTable)
      .insert(article)
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function update(article) {
    const queryResult = await knex(articlesTable)
      .update(article)
      .where({
        id: article.id
      })
      .catch(error => {
        throw error
      })

    return queryResult
  }

  async function findById(id) {
    const queryResult = await knex
      .select('id')
      .from(articlesTable)
      .where({
        id: id
      })
      .first()
      .catch(error => {
        throw error
      })

    const article = {
      notFound: Object.keys(queryResult).length === 0,
      id: queryResult?.id
    }

    return article
  }

  async function getPage(page) {
    const maximumArticlePerPage = 10
    const offset = page * maximumArticlePerPage - maximumArticlePerPage

    const articles = await knex({
      article: articlesTable
    })
      .select(
        'article.id',
        'article.title',
        'article.description',
        'article.category_id',
        'users.name as author_name'
      )
      .join('users', 'users.id', 'author_id')
      .limit(maximumArticlePerPage)
      .offset(offset)
      .catch(error => {
        throw error
      })

    return articles
  }

  async function getById(id) {
    const queryResult = await knex
      .select()
      .from(articlesTable)
      .where({
        id: id
      })
      .first()
      .catch(error => {
        throw error
      })

    const article = {
      notFound: Object.keys(queryResult).length === 0,
      properties: {
        ...queryResult,
        content: queryResult?.content?.toString()
      }
    }

    return article
  }

  async function findEqual({
    title,
    category_id
  }) {
    const article = await knex
      .select('id')
      .from(articlesTable)
      .where({
        title: title,
        category_id: category_id
      })
      .first()
      .catch(error => {
        throw error
      })

    return article
  }

  function getArticleAuthorQuery(article) {
    const queryArticleAuthor = knex(usersTable)
      .select(knex.raw('? as type', 'author_id'), 'id')
      .where('id', article.author_id)
      .first()

    return queryArticleAuthor
  }

  function getArticleCategoryQuery(article) {
    const queryArticleCategory = knex(categoriesTable)
      .select(knex.raw('? as type', 'category_id'), 'id')
      .where('id', article.category_id)
      .first()

    return queryArticleCategory
  }

  function getHierarchyQuery(article) {
    const shouldQueryExistingArticle = Boolean(article?.id)

    const queryArticleAuthor = getArticleAuthorQuery(article)
    const queryArticleCategory = getArticleCategoryQuery(article)

    const queryHierarchyTree = knex
      .from({
        article: articlesTable
      })
      .select(knex.raw('? as type', 'article_id'), 'id')
      .where('article.title', article.title)
      .andWhere('article.category_id', article.category_id)
      .unionAll(queryArticleCategory, queryArticleAuthor, true)
      .limit(4)

    if (shouldQueryExistingArticle) {
      queryHierarchyTree.orWhere('article.id', article.id)
    }

    return queryHierarchyTree
  }

  async function findHierarchyTree(article) {
    const queryArticleTree = getHierarchyQuery(article)

    const queryResults = await queryArticleTree
      .catch(error => {
        throw error
      })

    function isExistingArticle(queryResult) {
      const articleFound = queryResult?.type === 'article_id'
      const isTargetArticle = queryResult?.id === article.id

      const articleExists = articleFound && isTargetArticle

      return articleExists
    }

    function isRepeatedArticle(queryResult) {
      const articleFound = queryResult?.type === 'article_id'
      const isRepeatedArticle = queryResult?.id !== article.id

      const articleIsRepeated = articleFound && isRepeatedArticle

      return articleIsRepeated
    }

    function isExistingCategory(queryResult) {
      return queryResult?.type === 'category_id'
    }

    function isExistingAuthor(queryResult) {
      return queryResult?.type === 'author_id'
    }

    const existingArticleId = queryResults?.find(isExistingArticle)?.id
    const repeatedArticleId = queryResults?.find(isRepeatedArticle)
    const existingCategoryId = queryResults?.find(isExistingCategory)?.id
    const existingAuthorId = queryResults?.find(isExistingAuthor)?.id

    const hierarchyTree = {
      articleNotFound: !Boolean(existingArticleId),
      articleIsRepeated: Boolean(repeatedArticleId),
      categoryNotFound: !Boolean(existingCategoryId),
      authorNotFound: !Boolean(existingAuthorId)
    }

    console.log(queryResults)
    console.log(hierarchyTree)

    return hierarchyTree
  }

  async function listByCategoryTree(rootCategoryId, page) {
    const articlesPerPage = 10
    const offset = page * articlesPerPage - articlesPerPage

    const queryCategoryHierarchy = knex
      .withRecursive('categoryTree', query => {
        query
          .select('id')
          .from(categoriesTable)
          .where('id', rootCategoryId)
          .orWhere('parent_id', rootCategoryId)
      })
      .select('id').from('categoryTree')

    const articles = await knex({
      article: articlesTable
    })
      .select(
        'article.id',
        'article.title',
        'article.description',
        'article.thumbnail_url',
        'author.name as author_name'
      )
      .whereIn('article.category_id', queryCategoryHierarchy)
      .innerJoin({
        author: usersTable
      }, 'author.id', 'article.author_id')
      .limit(articlesPerPage)
      .offset(offset)
      .catch(error => {
        throw error
      })

    return articles
  }

  async function remove(id) {
    await knex(articlesTable)
      .where('id', id)
      .del()
      .catch(error => {
        throw error
      })
  }

  async function count() {
    const queryResult = await knex(articlesTable)
      .count('id')
      .first()

    const countAsNumber = parseInt(queryResult.count)
    return countAsNumber
  }

  return {
    create,
    update,
    findById,
    getPage,
    getById,
    findEqual,
    findHierarchyTree,
    listByCategoryTree,
    remove,
    count
  }
}