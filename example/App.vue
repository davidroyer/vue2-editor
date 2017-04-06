<template>
  <div id="app">
    <h1>Vue2Editor 2.0 (In Development)</h1>
    <!-- <vue-editor></vue-editor> -->
    <div class="flexWrapper">
      <div class="editorWrapper">
        <vue-editor v-model="editorContent"></vue-editor>
        <button @click="saveContent">Save</button>
      </div>
      <div class="preview" v-html="editorContent"></div>
    </div>

  </div>
</template>

<script>
  import {VueEditor} from '../src/index.js'
  // import Vue2Editor from '../src/Vue2Editor.vue'
  export default {
    components: {
      VueEditor,
      // Vue2Editor
    },
    data() {
      return {
        editorContent: '<h1>Content</h1>'
      }
    },

    methods: {
      saveContent() {
        console.log(this.editorContent);
      }
    }
  }
</script>

<style>
.flexWrapper {
      display: flex;
}
.editorWrapper {
    flex-basis: 50%;
}
.quillWrapper {
  position: relative;
  z-index: 99999;
}
  .preview {
    flex-basis: 50%;
    background: #f9f9f9;
    padding: .5em 3em;
  }
</style>
