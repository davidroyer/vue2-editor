/* eslint-disable no-console */
import VueEditor from "./components/VueEditor.vue";
import VSimple from "./components/VSimple.vue";
import VComp from "./components/VComp.js";
import NEditor from "./components/NEditor.js";
console.log("TCL: VComp", VComp);
// eslint-disable-next-line no-console
console.log("TCL: VueEditor", VueEditor);

const Plugin = {
  install(Vue, options = {}) {
    Vue.component("VueEditor", VueEditor);
    Vue.component("VSimple", VSimple);
    Vue.component("VComp", VComp);
    Vue.component("NEditor", NEditor);
  }
};

export default Plugin;
