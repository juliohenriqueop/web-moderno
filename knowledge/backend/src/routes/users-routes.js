module.exports = function(app) {
  const idValidationMiddleware = app.validation.middlewares['id-validation-middleware']
  const userValidationMiddleware = app.validation.middlewares['user-validation-middleware']
  const adminValidationMiddleware = app.validation.middlewares['admin-validation-middleware']
  const usersController = app.controllers['users-controller']
  const authenticationController = app.controllers['authentication-controller']
  const requiresAuthorization = app.authentication['authorization']

  app.route('/users')
    .post(userValidationMiddleware)
    .post(usersController.create)
    .post(authenticationController.signUp)

    .get(requiresAuthorization({
      admin: true
    }))
    .get(usersController.list)

  app.route('/users/:id')
    .all(idValidationMiddleware)

    .all((request, response, next) => {
      const authorizationMiddleware = requiresAuthorization({
        id: request.id,
        admin: true
      })
      return authorizationMiddleware(request, response, next)
    })

    .put(userValidationMiddleware)
    .put(usersController.update)

    .get(usersController.get)

    .delete(usersController.softDelete)

  app.route('/users/:id/permissions')
    .all(requiresAuthorization({
      admin: true
    }))
    .all(idValidationMiddleware)

    .patch(adminValidationMiddleware)
    .patch(usersController.changePermissions)
}