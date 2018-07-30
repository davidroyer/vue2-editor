<template>
  <div class="basic">
    <h1>Custom Image Handler Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            v-model="content"
            ref="editor"
            useCustomImageHandler
            @imageAdded="handleImageAdded">
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "../../src/index.js";
import axios from "axios";
const CLIENT_ID = "993793b1d8d3e2e";

export default {
  components: { VueEditor },

  data: () => ({
    editorOption: {
      bounds: "#editor-boundary",
      placeholder: "Custom placeholder text here ..."
    },
    content: "<h1>Starting content</h1>"
  }),

  methods: {
    handleImageAdded(file, Editor, cursorLocation) {
      console.log("Using Method in Parent");

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://api.imgur.com/3/image",
        method: "POST",
        headers: {
          Authorization: "Client-ID " + CLIENT_ID
        },
        data: formData
      })
        .then(result => {
          console.log(result);
          let url = result.data.data.link;
          Editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
