module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendErrorResponse = app.http.responses['send-error-response']

  function sendConflictResponse(response, message) {
    sendErrorResponse(response, statusCodes.conflict, message)
  }

  return sendConflictResponse
}