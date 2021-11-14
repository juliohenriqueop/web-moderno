module.exports = function(app) {
  function logError(errorMessage) {
    const backgroundColorRed = '\x1b[41m%s\x1b[37m'
    const defaultBackgroundColor = '\x1b[0m'

    console.error(backgroundColorRed, errorMessage, defaultBackgroundColor)
  }

  return logError
}