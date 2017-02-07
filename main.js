import Vue from 'vue'
import App from './App.vue'
import '../dist/vue2-editor.css'
import VueEditor from '../dist/vue2-editor.common'
console.log(VueEditor);
Vue.use(VueEditor)
new Vue({
  el: '#app',
  render: h => h(App)
})
