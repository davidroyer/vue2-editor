<template>
  <div id="quillWrapper">

      <div ref="quillContainer" id="quill-container"></div>

      <div v-if="showPreview" ref="livePreview" class="ql-editor"></div>

  </div>
</template>

<script>
import Quill from 'quill'

require('quill/dist/quill.core.css')
require('quill/dist/quill.snow.css')

var defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],

  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']
]

export default {
  name: 'vue-editor',
  props: {
    value: String,
    placeholder: String,
    buttonText: String,
    editorToolbar: Array,
    useSaveButton: {
      type: Boolean,
      default () {
        return true
      }
    },
    showPreview: {
      type: Boolean,
      default () {
        return false
      }
    }
  },

  data: function () {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
    }
  },

  mounted: function () {
    const vm = this

    vm.quill = new Quill(vm.$refs.quillContainer, {
      modules: {
        toolbar: this.toolbar
      },
      placeholder: this.placeholder ? this.placeholder : '',
      theme: 'snow'
    });

    vm.editor = document.querySelector('.ql-editor')

    if (vm.editorContent) {
      vm.editor.innerHTML = vm.editorContent
    }

    if ( vm.$refs.livePreview !== undefined || false ) {

      vm.quill.on('text-change', function() {
        vm.$refs.livePreview.innerHTML = vm.editor.innerHTML
        vm.$emit('input', vm.editor.innerHTML)
      });

    } else {

      vm.quill.on('text-change', function() {
        vm.$emit('input', vm.editor.innerHTML)
      });

    }
  },

  watch: {
    editorContent: function () {
      this.editor.innerHTML = this.editorContent
    }
  }
}
</script>

<style scoped>

#quill-container {
  height: 400px;
}

</style>
