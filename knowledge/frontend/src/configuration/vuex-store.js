import Vue from 'vue'
import Vuex from 'vuex'

import MenuStore from '@/stores/Menu'
import UserStore from '@/stores/User'
import CategoriesStore from '@/stores/Categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu: MenuStore,
    user: UserStore,
    categories: CategoriesStore
  }
})