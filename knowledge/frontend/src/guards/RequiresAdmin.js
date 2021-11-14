import AuthenticationService from '@/services/Authentication'

export default function requiresAdmin(to, from, next) {
  const token = AuthenticationService.getToken()
  if (!token) return next({
    name: "home"
  })

  const tokenPayload = AuthenticationService.parseTokenPayload(token)
  if (!tokenPayload.user.admin) return next({
    name: "home"
  })

  next()
}