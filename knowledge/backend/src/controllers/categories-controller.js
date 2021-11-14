module.exports = function(app) {
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const sendNotFoundResponse = app.http.responses['send-not-found-response']
  const sendNoContentResponse = app.http.responses['send-no-content-response']
  const sendConflictResponse = app.http.responses['send-conflict-response']
  const sendOkResponse = app.http.responses['send-ok-response']
  const categoryValidationMessages = app.localizations.pt_br['category-validation-messages']
  const categoriesRepository = app.repositories['categories-repository']
  const articlesRepository = app.repositories['articles-repository']

  async function ensureIsNotRepeated(request, response, next) {
    const category = request.category
    const hasParent = category.parent_id !== null

    const equalCategory = await categoriesRepository.findEqual(category)

    if (hasParent && equalCategory.parentNotFound) {
      return sendNotFoundResponse(response, categoryValidationMessages.not_found)
    }

    if (equalCategory.exists) {
      return sendConflictResponse(response, categoryValidationMessages.already_exists)
    }

    next()
  }

  async function create(request, response) {
    const category = request.category
    const categoryId = await categoriesRepository.create(category)

    const responseBody = {
      id: categoryId
    }

    return sendOkResponse(response, responseBody)
  }

  async function update(request, response) {
    const category = request.category

    await categoriesRepository.update(category)
    return sendNoContentResponse(response)
  }

  async function list(request, response) {
    const categories = await categoriesRepository.getAll()
    return sendOkResponse(response, categories)
  }

  async function remove(request, response) {
    const categoryId = request.id
    const category = await categoriesRepository.hasChildren(categoryId)

    if (category.notFound) {
      return sendNotFoundResponse(response, categoryValidationMessages.not_found)
    }

    if (category.hasChildren) {
      return sendConflictResponse(response, categoryValidationMessages.can_not_delete)
    }

    await categoriesRepository.remove(categoryId)
    return sendNoContentResponse(response)
  }

  return {
    create: [ensureIsNotRepeated, create],
    update: [ensureIsNotRepeated, update],
    list,
    remove
  }
}