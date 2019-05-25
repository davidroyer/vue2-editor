<template>
  <div id="app">
    <vue-editor
      v-model="content"
      use-markdown-shortcuts
      :custom-modules="customModulesForEditor"
      :editor-toolbar="customToolbar"
      :editor-options="editorSettings"
    >
    </vue-editor>
  </div>
</template>

<script>
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default {
  // components: {
  //   VueEditor
  // },

  data() {
    return {
      content: "<h1>Some initial content</h1>",
      customModulesForEditor: [
        { alias: "imageDrop", module: ImageDrop },
        { alias: "imageResize", module: ImageResize }
      ],
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"]
      ],
      editorSettings: {
        modules: {
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          imageDrop: true,
          imageResize: true
        }
      }
    };
  }
};
</script>
