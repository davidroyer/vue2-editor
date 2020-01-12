<template>
  <div>
    <button @click.prevent="focusEditor">Focus Editor</button>
    <vue-editor ref="editor" v-model="content" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },

  data: () => ({
    content: "<h1>Some initial content</h1>"
  }),

  methods: {
    focusEditor() {
      this.$refs.editor.quill.focus();
    }
  }
};
</script>
