module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendErrorResponse = app.http.responses['send-error-response']

  function sendUnauthorizedResponse(response, message) {
    return sendErrorResponse(response, statusCodes.unauthorized, message)
  }

  return sendUnauthorizedResponse
}