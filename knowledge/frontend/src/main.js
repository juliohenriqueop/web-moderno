import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/styles/body.css'
import '@/styles/toast.css'

import Vue from 'vue'

import '@/configuration/axios-interceptors'

import '@/configuration/bootstrap-vue'
import '@/configuration/vue-toasted'

import router from '@/configuration/vue-router'
import store from '@/configuration/vuex-store'

import App from '@/components/App'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store: store,
  router: router,
  render: function(createElement) {
    return createElement(App)
  }
})