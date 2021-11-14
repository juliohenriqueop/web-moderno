const passport = require('passport')
const {
  Strategy,
  ExtractJwt
} = require('passport-jwt')

module.exports = function(app) {
  const usersRepository = app.repositories['users-repository']

  const jwtStrategyConfig = {
    secretOrKey: process.env.AUTH_SECRET,
    algorithms: ['HS256'],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  const jwtStrategy = new Strategy(jwtStrategyConfig, (payload, done) => {
    const user = usersRepository.getById(payload.user.id)

    if (user) {
      return done(null, payload.user)
    }

    return done(null, false)
  })

  passport.use(jwtStrategy)

  function requiresAuthentication(request, response, next) {
    const middleware = passport.authenticate('jwt', {
      session: false
    })
    return middleware(request, response, next)
  }

  return requiresAuthentication
}