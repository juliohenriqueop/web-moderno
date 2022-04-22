module.exports = function(app) {
  const {
    comparePassword
  } = app.authentication['password-cypher']
  const {
    generateToken
  } = app.authentication['json-web-token']
  const sendNotFoundResponse = app.http.responses['send-not-found-response']
  const sendUnauthorizedResponse = app.http.responses['send-unauthorized-response']
  const sendOkResponse = app.http.responses['send-ok-response']
  const usersRepository = app.repositories['users-repository']
  const credentialsValidationMessages = app.localizations.pt_br['credentials-validation-messages']

  function signUp(request, response) {
    const user = request.user

    const tokenContent = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: process.env.DEMO_MODE === 'true'
      }
    }

    const tokenDuration = parseInt(process.env.TOKEN_DURATION)
    const token = generateToken(tokenContent, tokenDuration)

    return sendOkResponse(response, {
      token
    })
  }

  async function signIn(request, response) {
    const credentials = request.credentials

    const user = await usersRepository.getCredentialsByEmail(credentials.email)

    if (user.notFound) {
      return sendNotFoundResponse(response, credentialsValidationMessages.invalid_credentials)
    }

    const passwordsMatch = await comparePassword(credentials.password, user.password)
    const passwordIsWrong = !Boolean(passwordsMatch)

    delete credentials.password
    delete user.password

    if (passwordIsWrong) {
      return sendUnauthorizedResponse(response, credentialsValidationMessages.invalid_credentials)
    }

    const tokenContent = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin
      }
    }

    const tokenDuration = parseInt(process.env.TOKEN_DURATION)
    const token = generateToken(tokenContent, tokenDuration)

    return sendOkResponse(response, {
      token
    })
  }

  function authorize(request, response) {
    return sendOkResponse(response)
  }

  return {
    signUp,
    signIn,
    authorize
  }
}