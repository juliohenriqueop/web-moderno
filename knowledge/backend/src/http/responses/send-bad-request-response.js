module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendErrorResponse = app.http.responses['send-error-response']

  function sendBadRequestResponse(response, message) {
    return sendErrorResponse(response, statusCodes.badRequest, message)
  }

  return sendBadRequestResponse
}