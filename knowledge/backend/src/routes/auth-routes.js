module.exports = function(app) {
  const requiresAuthentication = app.authentication['authentication']
  const credentialsValidationMiddleware = app.validation.middlewares['credentials-validation-middleware']
  const authenticationController = app.controllers['authentication-controller']

  app.route('/auth/signIn')
    .post(credentialsValidationMiddleware)
    .post(authenticationController.signIn)

  app.route('/auth/authorize')
    .all(requiresAuthentication)
    .post(authenticationController.authorize)
}