module.exports = function(app) {
  function internalServerError(error, request, response, next) {
    console.error(error)
    return response.status(500).send()
  }

  return internalServerError
}