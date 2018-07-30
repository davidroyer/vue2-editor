<template>
  <div class="basic">
    <h1>Basic Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            v-model="content"
            :custom-modules="customModules"
            :editor-options="editorSettings">
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "../../src/index.js";
import { ImageDrop } from "quill-image-drop-module";
// Quill.register("modules/imageDrop", ImageDrop);

export default {
  components: { VueEditor },

  data: () => ({
    customModules: [{ alias: "imageDrop", module: ImageDrop }],
    editorSettings: {
      modules: {
        imageDrop: true
      }
    },
    content: "<h1>Starting content</h1>"
  })
};
</script>
