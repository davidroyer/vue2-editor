<template>
<div class="quillWrapper">
  <div ref="quillContainer" :id="id"></div>
  <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
</div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],

  [{ list: 'ordered' }, { list: 'bullet' }],

  [{ indent: '-1' }, { indent: '+1' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean']
]

export default {
  name: 'vue-editor',
  props: {
    value: String,
    id: {
      type: String,
      default: 'quill-container'
    },
    placeholder: String,
    disabled: Boolean,
    editorToolbar: Array,
    useCustomImageHandler: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
    }
  },

  mounted() {
    this.initializeVue2Editor()
    this.handleUpdatedEditor()
  },

  watch: {
    value(val) {
      if (val !== this.editor.innerHTML && !this.quill.hasFocus()) {
        this.editor.innerHTML = val
      }
    },
    disabled(status) {
      this.quill.enable(!status)
    }
  },

  methods: {
    initializeVue2Editor() {
      this.setQuillElement()
      this.setEditorElement()
      this.checkForInitialContent()
    },

    setQuillElement() {
      this.quill = new Quill(this.$refs.quillContainer, {
        modules: {
          toolbar: this.toolbar
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false
      })
      this.checkForCustomImageHandler()
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    checkForInitialContent() {
      this.editor.innerHTML = this.value || ''
    },

    checkForCustomImageHandler() {
      if (this.useCustomImageHandler === true) {
        this.setupCustomImageHandler()
      }
    },

    setupCustomImageHandler() {
      const toolbar = this.quill.getModule('toolbar')
      toolbar.addHandler('image', this.customImageHandler)
    },

    handleUpdatedEditor() {
      this.quill.on('text-change', () => {
        this.$emit('input', this.editor.innerHTML)
      })
    },

    customImageHandler(image, callback) {
      this.$refs.fileInput.click()
    },

    emitImageInfo($event) {
      const file = $event.target.files[0]
      const Editor = this.quill
      const range = Editor.getSelection()
      const cursorLocation = range.index
      this.$emit('imageAdded', file, Editor, cursorLocation)
    }
  }
}
</script>

<style>
  #quill-container {
    height: 400px;
  }
</style>
