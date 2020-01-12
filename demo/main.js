import Vue from 'vue'
import App from '~entry'
import plugin from '../src/index'

Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  // NOTE: if you need to inject as option, you can set here!
  // plugin,
  render: h => h(App)
}).$mount('#app')
