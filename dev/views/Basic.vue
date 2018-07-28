<template>
  <div class="basic">
    <h1>Basic Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "../../src/index.js";
// import { VueEditor, Quill } from "../../dist/vue2-editor.js";

export default {
  components: { VueEditor },
  data: () => ({
    editorOption: {
      bounds: "#editor-boundary",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }]
        ]
      },
      placeholder: "Custom placeholder text here ..."
    },
    content: "<h1>Starting content</h1>"
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
    addAnswer: function(event) {
      // Add new empty answer
      this.answers.push("");
    },
    removeAnswer: function(index) {
      // Remove answer at index
      this.answers.splice(index, 1);
    }
  }
};
</script>
