<template>
  <div class="basic">
    <h1>Syntax Highlighting Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            v-model="content"
            ref="editor"
            :options="editorOption">
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import { VueEditor, Quill } from "../../src/index.js";

export default {
  components: { VueEditor },

  data: () => ({
    editorOption: {
      modules: {
        toolbar: [["code-block"]], // Include button in toolbar
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        }
      },
      placeholder: "Custom placeholder text here ..."
    },
    content: ""
  }),

  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    onSelectionChange(range, oldRange, source) {
      console.log("Selection change!", range);
    }
  }
};
</script>
