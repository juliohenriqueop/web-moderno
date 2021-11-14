import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  position: 'top-right',
  iconPack: 'fontawesome',
  duration: 5000
})

Vue.toasted.register('SuccessToast',
  function (message) {
    return message.length > 0 ? message : 'Operação realizada com sucesso !'
  }, {
  type: 'success',
  icon: 'check',
  className: 'toast--custom',
  singleton: true
}
)

Vue.toasted.register('ErrorToast',
  function (message) {
    return message.length > 0 ? message : 'Ops... parece que algo deu errado.'
  }, {
  type: 'error',
  icon: 'exclamation-triangle',
  className: 'toast--custom',
  singleton: true
}
)