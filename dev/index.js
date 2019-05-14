import Vue from "vue";
import App from "./App.vue";
import Vue2Editor from "./../dist/vue2-editor.esm.js";
// import Vue2Editor from "./../src/lib.js";
// import router from "./router";

Vue.use(Vue2Editor);

new Vue({
  el: "#app",
  //   router,
  render: h => h(App)
});
