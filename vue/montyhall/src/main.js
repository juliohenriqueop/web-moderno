import Vue from 'vue'
import App from './components/App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: createElement => createElement(App),
})