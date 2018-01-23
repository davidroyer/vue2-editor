/**
 * Vue2-Editor
 */
import VueEditor from './VueEditor.vue'
import Icon from './components/Icon.vue'

const Vue2Editor = {
  VueEditor,
  install: function(Vue) {
    Vue.component(VueEditor.name, VueEditor),
    Vue.component(Icon.name, Icon)
  }
}

export default Vue2Editor;

export {
  VueEditor,
  Icon
}
