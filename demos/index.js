import Vue from "./node_modules/vue";
import router from "./router";
import App from "./App.vue";
import Vue2Editor from "../dist/vue2-editor";
// import Vue2Editor from "./../src/lib.js";

Vue.use(Vue2Editor);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
