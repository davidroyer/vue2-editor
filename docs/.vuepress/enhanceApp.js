export default ({ Vue }) => {
  if (typeof window !== "undefined") {
    Vue.use(window.Vue2Editor);
  }
  Vue.mixin({
    data: () => ({
      editorContent: "Content From Mixin"
    })
  });
};
