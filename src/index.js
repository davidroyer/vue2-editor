/**
 * Vue2-Editor
 */
import VueEditor from './VueEditor.vue'

const Vue2Editor = {
  VueEditor,
  install: function(Vue) {
    Vue.component(VueEditor.name, VueEditor)
  }
}

export default Vue2Editor
export { VueEditor }
