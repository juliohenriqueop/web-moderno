const mongoose = require('mongoose')

module.exports = function(app) {
  const logError = app.errors['log-error']

  mongoose.connect(process.env.MONGODB_DATABASE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(() => logError('Não foi possível se conectar ao MongoDB !'))

  return mongoose
}