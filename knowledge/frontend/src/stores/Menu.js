export default {
  namespaced: true,
  state: {
    hidden: true
  },
  mutations: {
    toggle(state) {
      state.hidden = !state.hidden
    },

    hide(state) {
      state.hidden = true;
    }
  }
}