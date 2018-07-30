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
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @ready="onEditorReady"
            @selection-change="onSelectionChange">
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "../../src/index.js";
import { ImageDrop } from "quill-image-drop-module";

Quill.register("modules/imageDrop", ImageDrop);

export default {
  components: { VueEditor },

  data: () => ({
    editorOption: {
      bounds: "#editor-boundary",
      modules: {
        imageDrop: true
      }
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
    onSelectionChange(range, oldRange, source) {
      console.log("Selection change!", range);
    }
  }
};
</script>
