<template>
  <div class="quillWrapper">
    <div ref="quillContainer" :id="id"></div>
    <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
  </div>
</template>

<script>
import Quill from 'quill'
import defaultToolbar from './helpers/toolbar.js'
import MarkdownShortcuts from './helpers/MarkdownShortcuts'
import { ImageDrop } from 'quill-image-drop-module'
import merge from 'lodash.merge'

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

  computed: {
    filteredInitialContent() {
      let content = this.value || ''
      return content.replace(/(<div)/igm, '<p').replace(/<\/div>/igm, '</p>');
    }
  },

  data() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar,
      modules: {
        toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
      }
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
      this.registerModules()
      this.setQuillElement()
      this.setEditorElement()
      this.checkForInitialContent()
    },

    setQuillElement() {
      let quillOptions = {
        modules: {
          toolbar: this.toolbar,
          markdownShortcuts: {},
          imageDrop: true
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false,
      };

      this.prepareEditorOptions(quillOptions)
      this.quill = new Quill(this.$refs.quillContainer, quillOptions)
      this.checkForCustomImageHandler()
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    registerModule(customModule) {
      Quill.register('modules/' + customModule.alias, customModule.module)
      self.modules[customModule.alias] = customModule.config
    },

    registerModules() {
      Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
      Quill.register('modules/imageDrop', ImageDrop)
    },

    prepareEditorOptions(quillOptions) {
      if (Object.keys(this.editorOptions).length > 0 && this.editorOptions.constructor === Object) {
        if (this.editorOptions.modules && typeof this.editorOptions.modules.toolbar !== 'undefined') {
          // We don't want to merge default toolbar with provided toolbar.
          delete quillOptions.modules.toolbar;
        }
        merge(quillOptions, this.editorOptions);
      }
    },

    checkForInitialContent() {
      this.editor.innerHTML = this.filteredInitialContent
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

<style src="quill/dist/quill.snow.css"></style>
<style src="./styles/vue2-editor.scss" lang='scss'></style>
