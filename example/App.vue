<template>
<div id="app">
  <div class="container grid-960">
    <h1>Vue2Editor 2.0 (In Development)</h1>
    <!-- <vue-editor
        v-model="content"
        :editor-toolbar="customToolbar">
      </vue-editor> -->
    <!-- <button class="btn btn-primary" @click="saveContent(content)">Save</button> -->
    <button class="btn btn-primary" @click="setEditor">Set Editor</button>
    <button class="btn btn-primary" @click="toggleDisabled">Toggle Disabled</button>
    <div class="columns">
      <div class="editorWrapper column col-6 col-sm-12">
        <vue-editor v-model="editorContent"></vue-editor>
        <!-- <vue-editor v-model="editorContent" :editorToolbar="customToolbar"></vue-editor> -->
        <button class="btn btn-primary" @click="saveContent(editorContent)">Save</button>
      </div>
      <div id="preview" class="column col-6 col-sm-12" v-if="showPreview" v-html="editorContent"></div>
    </div>
  </div>
</div>
</template>

<script>
import {
  VueEditor
} from '../src/index.js'

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      editorContent: '<h1>Starting Content</h1>',
      showPreview: true,
      content: '<h1>Html For Editor</h1>',
      editorIsDisabled: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        ['image', 'code-block']
      ]
    }
  },

  methods: {
    setEditor() {
      this.editorContent = 'Set programatically!'
    },

    saveContent(content) {
      console.log(content);
      // console.log(this.editorContent);
    },

    toggleDisabled() {
      this.editorIsDisabled = !this.editorIsDisabled
    }
  }
}
</script>

<style>
/*.flexWrapper {
      display: flex;
}
.editorWrapper {
    flex-basis: 50%;
}
.quillWrapper {
  position: relative;
  z-index: 99999;
}
*/

#preview {
  background: #f6f6f6;
  border-left: 3px solid gray;
  padding: 2em;
  margin-left: 1em;
}
@media (min-width: 601px) {
  #preview {
    width: 47%;
  }
}

</style>
