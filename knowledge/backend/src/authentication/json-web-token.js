const jwt = require('jwt-simple')
const jwtAlgorithm = 'HS256'

module.exports = function(app) {

  function generateToken(data, durationInSeconds) {
    const issued_at = Math.floor(Date.now() / 1000)

    const payload = {
      ...data,
      iat: issued_at,
      nbf: issued_at,
      exp: issued_at + durationInSeconds
    }

    const authSecret = process.env.AUTH_SECRET
    return jwt.encode(payload, authSecret, jwtAlgorithm)
  }

  function validateToken(token) {
    try {
      const authSecret = process.env.AUTH_SECRET
      return jwt.decode(token, authSecret, false, jwtAlgorithm)
    } catch (error) {
      console.error(error)
    }

    return null
  }

  return {
    generateToken,
    validateToken
  }
}