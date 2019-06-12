<template>
  <div>
    <button @click="saveContent">Save</button>
    <vue-editor v-model="content" />
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
    handleSavingContent() {
      // You have the content to save
      console.log(this.content);
    }
  }
};
</script>

<template>
  <div id="app">
    <button @click="saveContent"></button>
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h3>Initial Content</h3>"
    };
  },

  methods: {
    handleSavingContent() {
      // You have the content to save
      console.log(this.content);
    }
  }
};
</script>
