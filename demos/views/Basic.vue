<template>
  <div class="basic">
    <h1>Basic Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <button @click="editorIsDisabled = !editorIsDisabled">Toggle</button>
        <button @click="$refs.editor.quill.focus()">Set Focus</button>
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            ref="editor"
            v-model="content"
            :editor-toolbar="toolbarSettings"
            :editor-options="editorSettings"
            :disabled="editorIsDisabled"
            placeholder="First custom placeholder"
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @ready="onEditorReady"
            @selection-change="onSelectionChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { VueEditor, Quill } from "../../src/index.js";

export default {
  // components: { VueEditor },

  data: () => ({
    toolbarSettings: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }]
    ],
    editorSettings: {},
    editorIsDisabled: false,
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
