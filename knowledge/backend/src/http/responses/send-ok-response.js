module.exports = function(app) {
  const statusCodes = app.http.responses['status-codes']
  const sendHttpResponse = app.http.responses['send-response']

  function sendOkResponse(response, body) {
    return sendHttpResponse(response, statusCodes.ok, 'application/json', body)
  }

  return sendOkResponse
}