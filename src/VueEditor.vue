<template>
  <div id="quillWrapper">

      <div ref="quillContainer" id="quill-container"></div>

      <button v-if="useSaveButton" class="save-content"
        @click="saveContent">
        {{ buttonText ? buttonText : 'Save Content' }}
      </button>

      <div v-if="showPreview" ref="livePreview" class="ql-editor"></div>

  </div>
</template>

<script>
import Quill from 'quill'
require('../node_modules/quill/dist/quill.core.css')
require('../node_modules/quill/dist/quill.snow.css')

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];
export default {
  name: 'quill',
  props: {
    editorContent: String,
    placeholder: String,
    buttonText: String,
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
      toolbar: toolbarOptions
      // toolbar: [
      //     [{ header: [1, 2, 3, 4, 5 , 6, false] }],
      //     ['bold', 'italic', 'underline'],
      //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      //     ['image', 'code-block']
      //   ]
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

    // Update LivePreview & emit the editor-updated event
    if ( vm.$refs.livePreview !== undefined || false ) {

      vm.quill.on('text-change', function() {
        vm.$refs.livePreview.innerHTML = vm.editor.innerHTML
        vm.$emit('editor-updated', vm.editor.innerHTML)
      });
    } else {

      // Only emit the editor-updated event
      vm.quill.on('text-change', function() {
        vm.$emit('editor-updated', vm.editor.innerHTML)
      });
    }

  },

  watch: {
    editorContent: function () {
      this.editor.innerHTML = this.editorContent
    }
  },

  methods: {
    saveContent: function (value) {
      this.$emit('save-content', this.editor.innerHTML)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#quill-container {
  height: 400px;
}

</style>
