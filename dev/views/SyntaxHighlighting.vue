<template>
  <div class="basic">
    <h1>Syntax Highlighting Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            ref="editor"
            v-model="content"
            useMarkdownShortcuts
            :editor-options="editorSettings">
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
    editorSettings: {
      modules: {
        toolbar: [["code-block"]],
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        }
      },
      placeholder: "Custom placeholder text here ..."
    },
    content: ""
  })
};
</script>
