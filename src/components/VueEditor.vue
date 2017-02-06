<template>
  <div id="quillWrapper">

    <div ref="quillContainer" id="quill-container">{{editorContent}}</div>

    <slot name="saveButton">
      <button class="save-button"
        v-if="useSaveButton"
        @click="saveContent">
        <slot name="buttonText">Save Content</slot>
        <!-- {{ buttonText ? buttonText : 'Save Content' }} -->
      </button>
    </slot>
    <div v-if="showPreview" ref="livePreview" class="ql-editor"></div>

  </div>
</template>

<script>
import Quill from 'quill'

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
    // this.editor.innerHTML = this.editorContent

    if ( vm.$refs.livePreview !== undefined || false ) {

      vm.quill.on('text-change', function() {
        vm.$refs.livePreview.innerHTML = vm.editor.innerHTML
        vm.$emit('editor-updated', vm.editor.innerHTML)
      });

    } else {

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
<style style="scoped">
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.snow.css';

#quill-container {
  height: 500px;
}

</style>
