module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendErrorResponse = app.http.responses['send-error-response']

  function sendNotFoundResponse(response, message) {
    sendErrorResponse(response, statusCodes.notFound, message)
  }

  return sendNotFoundResponse
}