const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const userValidationMessages = app.localizations.pt_br['user-validation-messages']

  function appendAdmin(request) {
    request.admin = request.body.admin
  }

  function removeRawAdmin(request) {
    delete request.body.admin
  }

  function adminValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendAdmin(request)
    removeRawAdmin(request)

    next()
  }

  return [
    expressValidator
    .check('admin', userValidationMessages.invalid_admin_permission)
    .exists()
    .not()
    .isNumeric()
    .not()
    .isString()
    .toBoolean(true),

    adminValidationMiddleware
  ]
}