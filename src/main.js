import Vue from "vue";
import App from "./App.vue";
import "./plugin";
// import "../dist/v-plugin-demo.common.js";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
