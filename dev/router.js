import Vue from "vue";
import Router from "vue-router";
import Basic from "./views/Basic.vue";
import Dashboard from "./views/Dashboard.vue";
import Customized from "./views/Customized.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/basic",
      name: "basic",
      component: Basic
    },
    {
      path: "/customized",
      name: "customized",
      component: Customized
    }
  ]
});
