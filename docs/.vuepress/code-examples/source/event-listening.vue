<template>
  <vue-editor
    v-model="content"
    @focus="onEditorFocus"
    @blur="onEditorBlur"
    @selection-change="onSelectionChange"
  />
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },

  data: () => ({
    content: "<h1>Some initial content</h1>"
  }),

  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },

    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },

    onSelectionChange(range) {
      console.log("selection change!", range);
    }
  }
};
</script>
