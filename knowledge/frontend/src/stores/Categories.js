export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    clear(state) {
      state.items = []
    },

    add(state, category) {
      state.items.push(category)
    },

    append(state, categories) {
      state.items.push(...categories)
    },

    update(state, categories) {
      state.items = []
      state.items.push(...categories)
    }
  }
}