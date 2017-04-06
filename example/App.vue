<template>
  <div id="app">
    <h1>Vue2Editor 2.0 (In Development)</h1>
    <button @click="setEditor">Set Editor</button>
    <div class="flexWrapper">
      <div class="editorWrapper">
        <vue-editor v-model="editorContent"></vue-editor>
        <button @click="saveContent">Save</button>
      </div>
      <div class="preview" v-if="showPreview" v-html="editorContent"></div>
    </div>

  </div>
</template>

<script>
  import {VueEditor} from '../src/index.js'

  export default {
    components: {
      VueEditor,
      // Vue2Editor
    },
    data() {
      return {
        editorContent: '<h1>Starting Content</h1>',
        showPreview: false
      }
    },

    methods: {
      setEditor() {
        this.editorContent = 'Set programatically!'
      },

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
