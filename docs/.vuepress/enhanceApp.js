export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // NOTE: Works in DEV mode
  if (typeof window !== "undefined") {
    console.log("FROM ENHANCEAPP - GOT WINDOW");
    console.log("TCFROM ENHANCEAPP - window", window);

    Vue.use(window.Vue2Editor);
  }
  Vue.mixin({
    data: () => ({
      editorContent: "Content From Mixin"
    }),
    mounted() {
      // import('vue2-editor').then(module => {
      //     console.log('editor module', module);
      // })
    }
  });
  // if (window !== undefined) {
  // console.log("FROM ENHANCE: ", Vue2Editor);
  // Vue.use(Vue2Editor);
  // Vue.prototype.$Editor = Vue2Editor;
  // }
  // ...apply enhancements to the app
};
