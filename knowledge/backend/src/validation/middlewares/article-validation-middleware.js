const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const articleValidationMessages = app.localizations.pt_br['article-validation-messages']

  function appendArticle(request) {
    request.article = {
      id: request.id || request.params.id,
      title: request.body.title,
      description: request.body.description,
      thumbnail_url: request.body.thumbnail_url,
      content: request.body.content,
      author_id: request.body.author_id,
      category_id: request.body.category_id
    }
  }

  function removeRawArticle(request) {
    delete request.params.id
    delete request.body.title
    delete request.body.description
    delete request.body.thumbnail_url
    delete request.body.content
    delete request.body.author_id
    delete request.body.category_id
  }

  function articleValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendArticle(request)
    removeRawArticle(request)

    next()
  }

  return [
    expressValidator
    .check('title', articleValidationMessages.empty_title)
    .exists()
    .isString(),

    expressValidator
    .check('description', articleValidationMessages.empty_description)
    .exists()
    .isString(),

    expressValidator
    .check('thumbnail_url', articleValidationMessages.invalid_thumbnail_url)
    .optional({
      nullable: true,
      checkFalsy: true
    })
    .isURL(),

    expressValidator
    .check('content', articleValidationMessages.empty_content)
    .exists(),

    expressValidator
    .check('author_id', articleValidationMessages.invalid_author_id)
    .exists()
    .isInt({
      min: 0
    })
    .toInt(),

    expressValidator.check('category_id', articleValidationMessages.invalid_category_id)
    .exists()
    .isInt({
      min: 0
    })
    .toInt(),

    articleValidationMiddleware
  ]
}