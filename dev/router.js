import Vue from "vue";
import Router from "vue-router";
import Basic from "./views/Basic.vue";
import SyntaxHighlighting from "./views/SyntaxHighlighting.vue";
import Dashboard from "./views/Dashboard.vue";
import Modules from "./views/Modules.vue";
import Images from "./views/Images.vue";

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
      path: "/modules",
      name: "modules",
      component: Modules
    },
    {
      path: "/images",
      name: "images",
      component: Images
    },
    {
      path: "/syntax-highlighting",
      name: "syntax-highlighting",
      component: SyntaxHighlighting
    }
  ]
});
