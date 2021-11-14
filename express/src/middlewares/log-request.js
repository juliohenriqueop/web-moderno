function logRequestMiddleware(msg) {
  return function(req, res, next) {
    const timeString = new Date().toLocaleTimeString()
    console.log(`[${timeString}]: ${msg} - ${req.method}: ${req.originalUrl}.`)

    next()
  }
}

module.exports = logRequestMiddleware