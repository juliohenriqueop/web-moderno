export default {
  namespaced: true,

  state: {
    account: null,
    loginExpirationTimeout: null
  },

  getters: {
    id(state) {
      return state.account.id
    },

    name(state) {
      return state.account.name
    },

    email(state) {
      return state.account.email
    },

    admin(state) {
      return state.account.admin
    }
  },

  mutations: {
    setAccount(state, account) {
      state.account = account
    },

    setLoginExpirationTimeout(state, timeout) {
      state.loginExpirationTimeout = timeout;
    },

    removeAccount(state) {
      state.account = null
    }
  }
}