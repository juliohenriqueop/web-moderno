const articlesRepository = require("../repositories/articles-repository")

module.exports = function(app) {
  const idValidationMiddleware = app.validation.middlewares['id-validation-middleware']
  const articleValidationMiddleware = app.validation.middlewares['article-validation-middleware']
  const pageValidationMiddleware = app.validation.middlewares['page-validation-middleware']
  const articlesController = app.controllers['articles-controller']
  const requiresAuthentication = app.authentication['authentication']
  const requiresAuthorization = app.authentication['authorization']

  app.route('/articles')
    .get(requiresAuthentication)
    .get(pageValidationMiddleware)
    .get(articlesController.list)

    .post(requiresAuthorization({
      admin: true
    }))
    .post(articleValidationMiddleware)
    .post(articlesController.create)

  app.route('/articles/page/:page')
    .all(requiresAuthentication)
    .all(pageValidationMiddleware)

    .get(articlesController.list)

  app.route('/articles/:id')
    .get(requiresAuthentication)
    .get(idValidationMiddleware)
    .get(articlesController.get)

    .put(requiresAuthorization({
      admin: true
    }))
    .put(idValidationMiddleware)
    .put(articleValidationMiddleware)
    .put(articlesController.update)

    .delete(requiresAuthorization({
      admin: true
    }))
    .delete(idValidationMiddleware)
    .delete(articlesController.remove)

  app.route('/categories/:id/articles')
    .get(requiresAuthentication)
    .get(idValidationMiddleware)
    .get(articlesController.listByCategory)

  app.route('/categories/:id/articles/page/:page')
    .get(requiresAuthentication)
    .get(pageValidationMiddleware)
    .get(idValidationMiddleware)
    .get(articlesController.listByCategory)
}