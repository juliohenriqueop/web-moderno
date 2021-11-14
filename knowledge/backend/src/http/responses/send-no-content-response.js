module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendHttpResponse = app.http.responses['send-response']

  function sendNoContentResponse(response) {
    return response.sendStatus(statusCodes.noContent)
  }

  return sendNoContentResponse
}