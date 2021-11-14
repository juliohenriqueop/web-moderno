module.exports = function(app) {
  function sendHttpResponse(response, statusCode, mimeType, body) {
    return response.status(statusCode).type(mimeType).send(body)
  }

  return sendHttpResponse
}