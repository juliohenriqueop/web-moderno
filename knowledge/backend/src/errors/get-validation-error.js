const expressValidator = require('express-validator')

module.exports = function (app) {
  function getValidationError(request) {
    const errors = expressValidator.validationResult(request)
    const errorsExists = !errors.isEmpty()

    if (errorsExists) {
      const firstError = errors.array({
        onlyFirstError: true
      })[0]

      const errorMessage = firstError.msg

      return {
        failed: true,
        message: errorMessage
      }
    }

    return {
      failed: false
    }
  }

  return getValidationError
}