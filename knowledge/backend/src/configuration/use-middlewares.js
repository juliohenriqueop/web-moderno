const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = function(app) {
  const internalServerErrorMiddleware = app.errors['internal-error-middleware']

  app.use(cors())
  app.use(bodyParser.json())
  app.use(internalServerErrorMiddleware)
}