console.log("HIII");

import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import Vue2Editor from "../dist/vue2-editor.umd.min.js";

// import Vue2Editor from "../dist/Vue2Editor.umd.min.js";
// import "../dist/Vue2Editor.css";
// import Vue2Editor from "../dist/vue2-editor";
// import Vue2Editor from "./../src/plugin.js";

Vue.use(Vue2Editor);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
