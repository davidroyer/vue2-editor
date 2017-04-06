<template>
<div id="quillWrapper">
  <div ref="quillContainer" id="quill-container" :value="value"></div>

  <div v-if="showPreview" ref="livePreview" class="ql-editor"></div>

</div>
</template>
<script>
import Quill from 'quill'
var icons = Quill.import('ui/icons');
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// require('./icons/icons.js')
// icons['bold'] =
//   `<svg fill="#2d2d2d" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
//     <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>
//     <path d="M0 0h24v24H0z" fill="none"/>
// </svg>`;
// icons['bold'] = '<img src="/bold.svg" alt="" />';
// require('../node_modules/quill/dist/quill.core.css')
// require('../node_modules/quill/dist/quill.snow.css')
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
    editorContent: String,
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

  data: function() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
    }
  },

  mounted: function() {
    const vm = this

    vm.quill = new Quill(vm.$refs.quillContainer, {
      modules: {
        toolbar: this.toolbar
      },
      placeholder: this.placeholder ? this.placeholder : '',
      theme: 'snow'
    });

    vm.editor = document.querySelector('.ql-editor')

    if (vm.value) {
      vm.editor.innerHTML = vm.value
    }

    if (vm.$refs.livePreview !== undefined || false) {

      vm.quill.on('text-change', function() {
        vm.$refs.livePreview.innerHTML = vm.editor.innerHTML
        vm.$emit('input', vm.editor.innerHTML)
      });

    } else {

      vm.quill.on('text-change', function() {
        vm.$emit('input', vm.editor.innerHTML)
          // vm.$emit('editor-updated', vm.editor.innerHTML)
      });

    }
  },

  watch: {
    editorContent: function() {
      this.editor.innerHTML = this.value
    }
  },

  methods: {
    saveContent: function(value) {
      this.$emit('save-content', this.editor.innerHTML)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
#quill-container {
  height: 400px;
}

/*svg {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 100%;
  transition: all .2s ease;
  padding: 0px 4px;
  fill: #4d4d4d;
}

button {
  position: relative;
  transition: all .2s ease;
  border-radius: 3px;
  margin: 0 3px;
  height: 28px !important;
  width: 31px !important;
}

button.ql-active {

  background: #5b5b5b !important;
}

.ql-active svg {

    fill: #06c;
}

.ql-snow .ql-picker-options .ql-picker-item {
  position: relative;
  width: 100% !important;
}*/
</style>
