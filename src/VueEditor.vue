<template>
<div class="quillWrapper">
  <div ref="quillContainer" :id="id"></div>
  <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
</div>
</template>

<script>
import Quill from 'quill'
import merge from 'lodash.merge'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

var defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

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
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },

  data() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar,
    }
  },

  mounted() {
    this.initializeVue2Editor()
    this.handleUpdatedEditor()
  },

  watch: {
    value (val) {
      if (val !=  this.editor.innerHTML && !this.quill.hasFocus()) {
        this.editor.innerHTML = val
      }
    },
    disabled(status) {
      this.quill.enable(!status);
    }
  },

  methods: {
    initializeVue2Editor() {
      this.setQuillElement()
      this.setEditorElement()
      this.checkForInitialContent()
    },

    setQuillElement() {
      let quillOptions = {
        modules: {
          toolbar: this.toolbar
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false,
      };
      if (Object.keys(this.editorOptions).length > 0 && this.editorOptions.constructor === Object) {
        if (this.editorOptions.modules && typeof this.editorOptions.modules.toolbar !== 'undefined') {
          // We don't want to merge default toolbar with provided toolbar.
          delete quillOptions.modules.toolbar;
        }
        merge(quillOptions, this.editorOptions);
      }
      this.quill = new Quill(this.$refs.quillContainer, quillOptions)

      this.checkForCustomImageHandler()
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    checkForInitialContent() {
      this.editor.innerHTML = this.value || ''
    },

    checkForCustomImageHandler() {
      this.useCustomImageHandler === true ? this.setupCustomImageHandler() : ''
    },

    setupCustomImageHandler() {
      let toolbar = this.quill.getModule('toolbar');
      toolbar.addHandler('image', this.customImageHandler);
    },

    handleUpdatedEditor() {
      this.quill.on('text-change', () => {
        this.$emit('input', this.editor.innerHTML)
      })
    },

    customImageHandler(image, callback) {
      this.$refs.fileInput.click();
    },

    emitImageInfo($event) {
      let file = $event.target.files[0]
      let Editor = this.quill
      let range = Editor.getSelection();
      let cursorLocation = range.index
      this.$emit('imageAdded', file, Editor, cursorLocation)
    }
  }
}
</script>

<style>
  .ql-editor {
    min-height: 200px;
    font-size: 16px;
  }

  .ql-snow .ql-thin, .ql-snow .ql-stroke.ql-thin {
      stroke-width: 1px !important;
  }
  .quillWrapper .ql-snow.ql-toolbar {
      padding-top: 8px;
      padding-bottom: 4px;
  }

  .quillWrapper .ql-snow.ql-toolbar button {
    margin: 1px;
  }

  .quillWrapper .ql-snow.ql-toolbar .ql-formats {
    margin-bottom: 10px;
  }

  .quillWrapper .ql-snow.ql-toolbar button svg, .ql-snow .ql-toolbar button svg {
    width: 22px;
    height: 22px;
  }
  .quillWrapper .ql-editor ul[data-checked=true] > li::before, .quillWrapper .ql-editor ul[data-checked=false] > li::before {
    font-size: 1.35em;
    vertical-align: baseline;
    bottom: -0.065em;
    font-weight: 900;
    color: #222;
  }
  .quillWrapper  .ql-snow .ql-stroke {
      stroke: rgba(63, 63, 63, 0.95);
      stroke-linecap: square;
      stroke-linejoin: initial;
      stroke-width: 1.7px;
  }
  .quillWrapper .ql-picker-label {
    font-size: 15px;
  }
  .quillWrapper .ql-snow .ql-active .ql-stroke {
      stroke-width: 2.25px;
  }
  .quillWrapper .ql-toolbar.ql-snow .ql-formats {
    vertical-align: top;
  }
</style>
