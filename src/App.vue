<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Welcome to Your Plugin in Vue.js</h1>
    <p>add: 1 + 1 = {{ $add(1, 1) }}</p>
    <!-- <Editor v-model="content" @text-change="handleTextChange" /> -->
    <vue-editor
      v-model="content"
      use-markdown-shortcuts
      :editor-options="editorOptions"
    >
      <div id="my-toolbar" slot="toolbar">
        <span class="ql-formats">
          <select class="ql-header" defaultValue="0">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="0">Normal</option>
          </select>
          <select class="ql-font">
            <option></option>
            <option value="serif"></option>
            <option value="monospace"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <select class="ql-align">
            <option defaultValue></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </div>
    </vue-editor>
    <!-- <VueEditor
      v-model="content"
      use-markdown-shortcuts
      :editor-options="editorOptions"
    /> -->
  </div>
</template>

<script>
// import { Editor } from "./../dist/v-plugin-demo.esm.js";
export default {
  // components: { Editor },
  data() {
    return {
      // eToolbar: [
      //   [
      //     { align: "" },
      //     { align: "center" },
      //     { align: "right" },
      //     { align: "justify" }
      //   ],
      //   ["blockquote", "code-block"]
      // ],
      editorOptions: {
        modules: {
          toolbar: "#my-toolbar"
          // toolbar: [
          //   [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          //   ["bold", "italic", "underline", "strike"], // toggled buttons
          //   [
          //     { align: "" },
          //     { align: "center" },
          //     { align: "right" },
          //     { align: "justify" }
          //   ]
          //   // ["blockquote", "code-block"]
          // ]
        },
        placeholder: "newww placeholder text here ..."
      },
      content: "value"
    };
  },

  methods: {
    handleTextChange(obj) {
      console.log("TCL: handleTextChange -> obj", obj);
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
