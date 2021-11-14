import Vue from 'vue'
import App from './components/App'
import vuetify from './plugins/vuetify';
import './styles/global.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')