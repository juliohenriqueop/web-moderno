module.exports = function(app) {
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const sendNotFoundResponse = app.http.responses['send-not-found-response']
  const sendNoContentResponse = app.http.responses['send-no-content-response']
  const sendOkResponse = app.http.responses['send-ok-response']
  const articlesRepository = app.repositories['articles-repository']
  const articleValidationMessages = app.localizations.pt_br['article-validation-messages']
  const categoryValidationMessages = app.localizations.pt_br['category-validation-messages']

  async function create(request, response) {
    const article = request.article

    const articleHierarchy = await articlesRepository.findHierarchyTree(article)

    if (articleHierarchy.authorNotFound) {
      return sendNotFoundResponse(response, articleValidationMessages.author_not_found)
    }

    if (articleHierarchy.categoryNotFound) {
      return sendNotFoundResponse(response, categoryValidationMessages.not_found)
    }

    if (articleHierarchy.articleIsRepeated) {
      return sendBadRequestResponse(response, articleValidationMessages.repeated_title)
    }

    await articlesRepository.create(article)
    return sendNoContentResponse(response)
  }

  async function update(request, response) {
    const article = request.article
    const articleHierarchy = await articlesRepository.findHierarchyTree(article)

    if (articleHierarchy.articleNotFound) {
      return sendNotFoundResponse(response, articleValidationMessages.not_found)
    }

    if (articleHierarchy.authorNotFound) {
      return sendNotFoundResponse(response, articleValidationMessages.author_not_found)
    }

    if (articleHierarchy.categoryNotFound) {
      return sendNotFoundResponse(response, categoryValidationMessages.not_found)
    }

    if (articleHierarchy.articleIsRepeated) {
      return sendBadRequestResponse(response, articleValidationMessages.repeated_title)
    }

    await articlesRepository.update(article)
    return sendNoContentResponse(response)
  }

  async function list(request, response) {
    const requestedPage = request.page

    const articles = await articlesRepository.getPage(requestedPage)
    const articlesCount = await articlesRepository.count()

    const responseBody = {
      meta: {
        page: requestedPage,
        count: articlesCount
      },
      data: [
        ...articles
      ]
    }

    return sendOkResponse(response, responseBody)
  }

  async function get(request, response) {
    const articleId = request.id
    const category = await articlesRepository.getById(articleId)

    if (category.notFound) {
      return sendNotFoundResponse(response, articleValidationMessages.not_found)
    }

    return sendOkResponse(response, category.properties)
  }

  async function listByCategory(request, response) {
    const rootCategoryId = request.id
    const page = request.page

    const articles = await articlesRepository.listByCategoryTree(rootCategoryId, page)
    return sendOkResponse(response, articles)
  }

  async function remove(request, response) {
    const articleId = request.id
    const article = await articlesRepository.findById(articleId)

    if (article.notFound) {
      return sendNotFoundResponse(response, articleValidationMessages.not_found)
    }

    await articlesRepository.remove(articleId)
    return sendNoContentResponse(response)
  }

  return {
    create,
    update,
    list,
    get,
    listByCategory,
    remove
  }
}