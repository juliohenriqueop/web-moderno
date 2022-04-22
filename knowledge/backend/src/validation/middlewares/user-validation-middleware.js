const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const credentialsValidationMiddleware = app.validation.middlewares['credentials-validation-middleware']
  const userValidationMessages = app.localizations.pt_br['user-validation-messages']

  function appendUser(request) {
    request.user = {
      id: request.id || request.params.id,
      name: request.body.name,
      email: request.credentials.email || request.body.email,
      password: request.credentials.password || request.body.password,
      admin: process.env.DEMO_MODE === 'true'
    }
  }

  function removeRawUser(request) {
    delete request.params.id
    delete request.body.name
    delete request.body.email
    delete request.body.password
  }

  function userValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendUser(request)
    removeRawUser(request)

    next()
  }

  return [
    expressValidator
    .check('name', userValidationMessages.empty_name)
    .exists()
    .isString(),

    credentialsValidationMiddleware,
    userValidationMiddleware
  ]
}