/**
 * Vue2-Editor
 */
import VueEditor from './VueEditor.vue'
import VQuill from 'quill'
const Quill = window.Quill || VQuill

const Vue2Editor = {
  VueEditor,
  install: function(Vue) {
    Vue.component(VueEditor.name, VueEditor)
  }
}

export default Vue2Editor
export { VueEditor, Quill }
