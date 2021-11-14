module.exports = function(app) {
  return {
    ok: 200,
    noContent: 201,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    conflict: 409
  }
}