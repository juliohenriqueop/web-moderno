import store from "@/configuration/vuex-store"
import axios from "axios";
import jwt from "jwt-simple"

const backend = process.env.VUE_APP_BACKEND_URL
const signInEndPoint = process.env.VUE_APP_SIGN_IN_ENDPOINT
const tokenKey = process.env.VUE_APP_STORAGE_TOKEN_KEY
const authorizationEndPoint = process.env.VUE_APP_AUTHORIZATION_ENDPOINT
const usersEndPoint = process.env.VUE_APP_USERS_ENDPOINT

export default {
  async login(email, password) {
    store.commit("user/removeAccount")

    const URL = `${backend}/${signInEndPoint}`

    const credentials = {
      email,
      password
    }

    const response = await axios.post(URL, credentials)
    const token = response.data.token

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    localStorage.setItem(tokenKey, token)

    this.updateUserByToken(token)

    return token
  },

  async signUp(name, email, password) {
    store.commit("user/removeAccount")

    const URL = `${backend}/${usersEndPoint}`

    const credentials = {
      name,
      email,
      password
    }

    const response = await axios.post(URL, credentials)
    const token = response.data.token

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    localStorage.setItem(tokenKey, token)

    this.updateUserByToken(token)

    return token
  },

  updateUserByToken(token) {
    const tokenPayload = this.parseTokenPayload(token)
    store.commit("user/setAccount", tokenPayload.user)
  },

  getToken() {
    return localStorage.getItem(tokenKey)
  },

  parseTokenPayload(token) {
    return jwt.decode(token, null, true, 'HS256')
  },

  logout() {
    clearTimeout(store.state.user.loginExpirationTimeout)
    store.commit("user/removeAccount")

    localStorage.removeItem(tokenKey)
    delete axios.defaults.headers.common["Authorization"]
  },

  async authorize(token) {
    store.commit("user/removeAccount")

    const URL = `${backend}/${authorizationEndPoint}`

    const response = await axios.post(URL, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    this.updateUserByToken(token)

    return response.data
  },

  subscribeToTokenExpiration(onTokenExpireCallback, ...callbackParams) {
    const token = this.getToken()
    if (!token) return

    const tokenPayload = this.parseTokenPayload(token)

    const currentTime = new Date().getTime()
    const tokenExpiration = Math.floor((tokenPayload.exp * 1000) - currentTime)

    const expirationTimeout = setTimeout(onTokenExpireCallback, tokenExpiration, callbackParams)
    store.commit("user/setLoginExpirationTimeout", expirationTimeout)
  },

  subscribeToExternalLogin(onLoginCallback, ...callbackParams) {
    window.addEventListener('storage', () => {
      const token = this.getToken()
      if (!token) return

      return onLoginCallback(callbackParams)
    })
  },

  subscribeToExternalLogout(onLogoutCallback, ...callbackParams) {
    window.addEventListener('storage', () => {
      const token = this.getToken()
      if (token) return

      return onLogoutCallback(callbackParams)
    })
  }
}