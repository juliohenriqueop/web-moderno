const path = require('path')

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias.set(
        'vue$',
        path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.min.js')
      )
    } else {
      config.resolve.alias.set(
        'vue$',
        path.resolve(__dirname, 'node_modules/vue/dist/vue.js')
      )
    }
  }
}