<template>
  <div>
    <button @click="setEditorContent">Set Editor Content</button>
    <vue-editor v-model="content" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: { VueEditor },

  data: () => ({
    content: null
  }),

  methods: {
    setEditorContent() {
      this.content = "<h1>Html For Editor</h1>";
    }
  }
};
</script>
