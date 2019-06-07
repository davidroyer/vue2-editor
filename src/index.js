import Quill from "quill";
import VueEditor from "@/components/VueEditor.vue";

const version = "__VERSION__";

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$add = (a, b) => {
    return a + b;
  };

  Vue.component("VueEditor", VueEditor);
}

const VPlugin = {
  install,
  version,
  Quill
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(VPlugin);
}

export default VPlugin;
export { VueEditor, Quill };

/*************************************************/
