/* eslint-disable no-console */
import VueEditor from "./components/VueEditor";

const Plugin = {
  install(Vue, options = {}) {
    Vue.component("VueEditor", VueEditor);

    // Vue.prototype.$modal = {
    //   show(name) {
    //     location.hash = name
    //   },

    //   hide(name) {
    //     location.hash = '#'
    //   }
    // }
  }
};

export default Plugin;
