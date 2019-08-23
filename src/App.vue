<template>
  <div id="app">
    <button @click="deleteImage">Delete</button>
    <VueEditor
      ref="vEditor"
      v-model="content"
      use-custom-image-handler
      use-markdown-shortcuts
      @focus="onEditorFocus"
      @blur="onEditorBlur"
      @imageAdded="handleImageAdded"
      @image-removed="handleImageRemoved"
    />
  </div>
</template>

<script>
// import axiosInstance from "@/helpers/axios";
import axios from "axios";
import Quill from "quill";
const AlignStyle = Quill.import("attributors/style/align");
Quill.register(AlignStyle, true);

const BlockEmbed = Quill.import("blots/block/embed");

const CLIENT_ID = "993793b1d8d3e2e";

/**
 * Customize image so we can add an `id` attribute
 */
class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("src", value.url);
    node.setAttribute("id", value.id);
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute("src"),
      id: node.getAttribute("id")
    };
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";
Quill.register(ImageBlot);

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
    },

    deleteImage(id) {
      const ACCESS_TOKEN = "1d3ee7fe34576a55a24ec551061b2365b6ebaf23";

      axios({
        url: `https://api.imgur.com/3/image/${id}`,
        method: "DELETE",
        headers: { Authorization: "Bearer " + ACCESS_TOKEN }
      }).then(result => console.log("DELETE RESULT: ", result));
    },

    async handleImageAdded(file, Editor, cursorLocation) {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios({
        url: "https://api.imgur.com/3/image",
        method: "POST",
        headers: { Authorization: "Client-ID " + CLIENT_ID },
        data: formData
      });
      console.log("TCL: handleImageAdded -> data", data);

      const { link, id } = data.data;
      Editor.insertEmbed(
        cursorLocation,
        "image",
        {
          id,
          url: link
        },
        Quill.sources.USER
      );
    },

    handleImageRemoved(image) {
      console.log("handleImageRemoved -> image", image);
      this.deleteImage(image.id);
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
