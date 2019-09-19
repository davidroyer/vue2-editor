/* eslint-disable no-console */
import VueEditor from "./components/VueEditor.vue";

const Plugin = {
  install(Vue, options = {}) {
    console.log("install -> options", options);
    Vue.component("VueEditor", VueEditor);
  }
};

export default Plugin;
