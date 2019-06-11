export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof window !== "undefined") {
    Vue.use(window.Vue2Editor);
  }
  Vue.mixin({
    data: () => ({
      editorContent: "Content From Mixin"
    })
  });
};
