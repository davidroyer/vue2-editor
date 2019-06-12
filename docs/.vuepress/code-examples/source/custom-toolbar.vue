<template>
  <vue-editor v-model="content" :editor-toolbar="customToolbar" />
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },

  data: () => ({
    content: "<h1>Html For Editor</h1>",
    customToolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "code-block"]
    ]
  })
};
</script>
