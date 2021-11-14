import AuthenticationService from '@/services/Authentication'

export default function requiresAuth(to, from, next) {
  const token = AuthenticationService.getToken()
  if (token) return next()

  next({
    name: "login",
    query: {
      next: to.path
    }
  })
}