/**
 * Vue2-Editor
 */
import VueEditor from "./VueEditor.vue";
import VQuill from "quill";
const Quill = window.Quill || VQuill;

const Vue2Editor = {
  VueEditor,
  install: function(Vue) {
    Vue.component(VueEditor.name, VueEditor);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(Vue2Editor);
}

export default Vue2Editor;
export { VueEditor, Quill };
