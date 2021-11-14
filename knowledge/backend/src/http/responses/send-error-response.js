module.exports = function(app) {
  const sendHttpResponse = app.http.responses['send-response']

  function sendErrorResponse(response, statusCode, message) {
    const responseBody = {
      type: 'ERROR',
      message: message
    }

    return sendHttpResponse(response, statusCode, 'application/json', responseBody)
  }

  return sendErrorResponse
}