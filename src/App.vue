<template>
  <div id="app">
    <VueEditor
      ref="vEditor"
      v-model="content"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
    />
  </div>
</template>

<script>
import Quill from "quill";
const AlignStyle = Quill.import("attributors/style/align");
Quill.register(AlignStyle, true);

export default {
  data: () => ({
    content: ""
  }),

  methods: {
    handleTextChange(obj) {
      console.log("TCL: handleTextChange -> obj", obj);
    },

    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },

    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
