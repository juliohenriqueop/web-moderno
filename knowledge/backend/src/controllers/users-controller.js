module.exports = function(app) {
  const sendConflictResponse = app.http.responses['send-conflict-response']
  const sendNotFoundResponse = app.http.responses['send-not-found-response']
  const sendNoContentResponse = app.http.responses['send-no-content-response']
  const sendOkResponse = app.http.responses['send-ok-response']
  const {
    encryptPassword
  } = app.authentication['password-cypher']
  const userValidationMessages = app.localizations.pt_br['user-validation-messages']
  const usersRepository = app.repositories['users-repository']

  async function create(request, response, next) {
    const user = request.user
    user.password = await encryptPassword(user.password)

    const sameEmailUser = await usersRepository.findByEmail(user.email)

    if (sameEmailUser.exists) {
      return sendConflictResponse(response, userValidationMessages.already_exists)
    }

    user.id = await usersRepository.create(user)

    next()
  }

  async function update(request, response) {
    const user = request.user
    user.password = await encryptPassword(user.password)

    const sameEmailUser = await usersRepository.findRepeatedEmail(user.id, user.email)

    if (sameEmailUser.exists) {
      return sendConflictResponse(response, userValidationMessages.already_exists)
    }

    const updatedUser = await usersRepository.update(user)

    if (updatedUser.notFound) {
      return sendNotFoundResponse(response, userValidationMessages.not_found)
    }

    return sendNoContentResponse(response)
  }

  async function list(request, response) {
    const users = await usersRepository.getAll()
    return sendOkResponse(response, users)
  }

  async function get(request, response) {
    const userId = request.id

    const user = await usersRepository.getById(userId)

    if (user.notFound) {
      return sendNotFoundResponse(response, userValidationMessages.not_found)
    }

    delete user.notFound
    return sendOkResponse(response, user)
  }

  async function softDelete(request, response) {
    const userId = request.id
    const user = await usersRepository.hasArticles(userId)

    if (user.notFound) {
      return sendNotFoundResponse(response, userValidationMessages.not_found)
    }

    if (user.hasArticles) {
      return sendConflictResponse(response, userValidationMessages.has_articles)
    }

    await usersRepository.softDelete(userId)
    return sendNoContentResponse(response)
  }

  async function changePermissions(request, response) {
    const userId = request.id
    const admin = request.admin

    const user = await usersRepository.setPermissions(userId, admin)

    if (user.notFound) {
      return sendNotFoundResponse(response, userValidationMessages.not_found)
    }

    return sendNoContentResponse(response)
  }

  return {
    create,
    update,
    list,
    get,
    softDelete,
    changePermissions
  }
}