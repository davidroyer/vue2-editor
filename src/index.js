/**
 * Vue2-Editor
 */
import VueEditor from './VueEditor.vue'
import _Quill from 'quill'
const Quill = window.Quill || _Quill

const Vue2Editor = {
  VueEditor,
  install: function(Vue) {
    Vue.component(VueEditor.name, VueEditor)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vue2Editor)
}

export default Vue2Editor
export { VueEditor, Quill }
