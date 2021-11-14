import AuthenticationService from '@/services/Authentication'

export default function unavailableAfterAuth(to, from, next) {
  const token = AuthenticationService.getToken()
  if (token) return next({
    name: "home"
  })

  next()
}