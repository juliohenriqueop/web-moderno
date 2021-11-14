const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const credentialsValidationMessages = app.localizations.pt_br['credentials-validation-messages']

  function appendCredentials(request) {
    request.credentials = {
      email: request.body.email,
      password: request.body.password
    }
  }

  function removeRawCredentials(request) {
    delete request.body.email
    delete request.body.password
  }

  function credentialsValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendCredentials(request)
    removeRawCredentials(request)

    next()
  }

  return [
    expressValidator
    .check('email', credentialsValidationMessages.empty_email)
    .exists()
    .isEmail()
    .withMessage(credentialsValidationMessages.invalid_email),

    expressValidator
    .check('password', credentialsValidationMessages.empty_password)
    .exists()
    .isLength({
      min: 6
    })
    .withMessage(credentialsValidationMessages.short_password),

    credentialsValidationMiddleware
  ]
}