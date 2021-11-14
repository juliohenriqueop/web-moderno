module.exports = function(app) {
  const idValidationMiddleware = app.validation.middlewares['id-validation-middleware']
  const categoryValidationMiddleware = app.validation.middlewares['category-validation-middleware']
  const categoriesController = app.controllers['categories-controller']
  const requiresAuthentication = app.authentication['authentication']
  const requiresAuthorization = app.authentication['authorization']

  app.route('/categories')
    .get(requiresAuthentication)
    .get(categoriesController.list)

    .post(requiresAuthorization({
      admin: true
    }))
    .post(categoryValidationMiddleware)
    .post(categoriesController.create)

  app.route('/categories/:id')
    .get(requiresAuthentication)
    .get(idValidationMiddleware)

    .put(requiresAuthorization({
      admin: true
    }))
    .put(idValidationMiddleware)
    .put(categoryValidationMiddleware)
    .put(categoriesController.update)


    .delete(requiresAuthorization({
      admin: true
    }))
    .delete(idValidationMiddleware)
    .delete(categoriesController.remove)
}