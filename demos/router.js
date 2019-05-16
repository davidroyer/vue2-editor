import Vue from "vue";
import Router from "vue-router";
import Basic from "./views/Basic.vue";
import Customized from "./views/Customized.vue";
import CustomToolbar from "./views/CustomToolbar.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/"
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
    },
    {
      path: "/custom-toolbar",
      name: "custom-toolbar",
      component: CustomToolbar
    }
  ]
});
