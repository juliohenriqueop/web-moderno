const expressValidator = require('express-validator')

module.exports = function(app) {
  const getValidationError = app.errors['get-validation-error']
  const sendBadRequestResponse = app.http.responses['send-bad-request-response']
  const categoryValidationMessage = app.localizations.pt_br['category-validation-messages']

  function appendCategory(request) {
    request.category = {
      id: request.id || request.params.id,
      name: request.body.name,
      parent_id: request.body.parent_id || null
    }
  }

  function removeRawCategory(request) {
    delete request.params.id
    delete request.body.name
    delete request.body.parent_id
  }

  function categoryValidationMiddleware(request, response, next) {
    const validation = getValidationError(request)

    if (validation.failed) {
      return sendBadRequestResponse(response, validation.message)
    }

    appendCategory(request)
    removeRawCategory(request)

    next()
  }

  return [
    expressValidator
    .check('parent_id', categoryValidationMessage.invalid_parent_id)
    .toInt()
    .isInt({
      min: 0
    })
    .optional({
      nullable: true
    }),

    expressValidator
    .check('name', categoryValidationMessage.empty_name)
    .exists()
    .isString()
    .isLength({
      max: 30
    })
    .withMessage(categoryValidationMessage.long_name),

    categoryValidationMiddleware
  ]
}