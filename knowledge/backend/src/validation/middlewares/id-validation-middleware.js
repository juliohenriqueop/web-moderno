const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const idValidationMessages = app.localizations.pt_br['id-validation-messages']

  function appendId(request) {
    request.id = request.params.id
  }

  function removeRawId(request) {
    delete request.params.id
  }

  function idValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendId(request)
    removeRawId(request)

    next()
  }

  return [
    expressValidator
    .check('id', idValidationMessages.invalid_id)
    .exists()
    .isInt({
      min: 0
    })
    .toInt(),

    idValidationMiddleware
  ]
}