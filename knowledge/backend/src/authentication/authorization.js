const passport = require('passport')

module.exports = function(app) {
  return function requiresAuthorization(requiredAuthorizations = {}) {
    return function middleware(request, response, next) {
      return passport.authenticate('jwt', {
        session: false
      }, (error, user) => {
        for (const [accessKey, accessValue] of Object.entries(requiredAuthorizations)) {

          const shouldEnforceRule = Boolean(accessValue)
          const rulePassed = user[accessKey] === accessValue

          console.log(user)

          const userIsAuthorized = shouldEnforceRule && rulePassed

          if (userIsAuthorized) {
            return next()
          }
        }

        return response.status(403).send()
      })(request, response, next)
    }
  }
}