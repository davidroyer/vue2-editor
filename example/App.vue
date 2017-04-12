<template>
<div id="app">
  <div class="container grid-960">
    <h1>Vue2Editor 2.0 (In Development)</h1>
    <!-- <vue-editor
        v-model="content"
        :editor-toolbar="customToolbar">
      </vue-editor> -->
    <!-- <button class="btn btn-primary" @click="saveContent(content)">Save</button> -->
    <!-- <button class="btn btn-primary" @click="setEditor">Set Editor</button> -->
    <!-- <button class="btn btn-primary" @click="toggleDisabled">Toggle Disabled</button> -->
    <div class="columns">
      <div class="editorWrapper column col-6 col-sm-12">
        <vue-editor id="editor1" v-model="editor1Content" :disabled="editor1IsDisabled"></vue-editor>
        <button class="btn btn-primary" @click="saveContent(editor1Content)">Save</button>
        <button class="btn btn-primary" @click="toggleDisabledForEditor1">Toggle Disabled</button>
        <button class="btn btn-primary" @click="setEditor1">Set Editor</button>

        <vue-editor id="editor2" v-model="editor2Content" :disabled="editor2IsDisabled"></vue-editor>
        <button class="btn btn-primary" @click="saveContent(editor2Content)">Save</button>
        <button class="btn btn-primary" @click="toggleDisabledForEditor2">Toggle Disabled</button>
        <button class="btn btn-primary" @click="setEditor2">Set Editor</button>

        <!-- <vue-editor v-model="editorContent" :editorToolbar="customToolbar"></vue-editor> -->
      </div>
      <!-- <div id="preview" class="column col-6 col-sm-12" v-if="showPreview" v-html="editorContent"></div> -->
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
      editor1Content: '<h1>Editor 1 Starting Content</h1>',
      editor2Content: '<h1>Editor 2 Starting Content</h1>',
      showPreview: true,
      content: '<h1>Html For Editor</h1>',
      editor1IsDisabled: false,
      editor2IsDisabled: false,
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
    setEditor1(editor) {
      this.editor1Content = 'Set Editor 1 Content'
    },

    setEditor2(editor) {
      this.editor2Content = 'Set Editor 2 Content'
    },

    saveContent(content) {
      console.log(content);
      // console.log(this.editorContent);
    },

    toggleDisabledForEditor1() {
      this.editor1IsDisabled = !this.editor1IsDisabled
    },
    toggleDisabledForEditor2() {
      this.editor2IsDisabled = !this.editor2IsDisabled
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
.ql-disabled {
    opacity: 0.5;
    background: rgba(153, 153, 153, 0.2);
}

</style>
