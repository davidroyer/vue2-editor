// Import vue component
import VueEditor from "./components/VueEditor.vue";
import _Quill from "quill";
const Quill = window.Quill || _Quill;

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("VueEditor", VueEditor);
}

// Create module definition for Vue.use()
const Vue2Editor = {
  VueEditor,
  install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(Vue2Editor);
}

// To allow use as module (npm/webpack/etc.) export component
export default Vue2Editor;
export { VueEditor, Quill };
