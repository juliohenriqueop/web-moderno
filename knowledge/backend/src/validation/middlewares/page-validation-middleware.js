const expressValidation = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const articleValidationMessages = app.localizations.pt_br['article-validation-messages']

  function appendPage(request) {
    request.page = request.params.page || 1
  }

  function removeRawPage(request) {
    delete request.params.page
  }

  function pageValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendPage(request)
    removeRawPage(request)

    next()
  }

  return [
    expressValidation
    .check('page', articleValidationMessages.invalid_article_page)
    .optional()
    .isInt({
      min: 0
    })
    .toInt(),

    pageValidationMiddleware
  ]
}