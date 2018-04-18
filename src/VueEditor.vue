<template>
  <div class="quillWrapper">
    <div ref="quillContainer" :id="id"></div>
    <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
  </div>
</template>

<script>
import VQuill from 'quill'
import defaultToolbar from './helpers/toolbar.js'
import MarkdownShortcuts from './helpers/MarkdownShortcuts'
import merge from 'lodash.merge'
const Quill = window.Quill || VQuill

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
    customModules: Array,
    editorToolbar: Array,
    editorOptions: {
      type: Object,
      default: function () {
        return {};
      }
    },
    useCustomImageHandler: {
      type: Boolean,
      default: false
    },
  },

  computed: {
    filteredInitialContent() {
      let content = this.value || ''
      return content.replace(/(<div)/igm, '<p').replace(/<\/div>/igm, '</p>');
    },

    imageResizeActive() {
      return this.quill.options.modules.imageResize !== undefined ? true : false
    }
  },

  data() {
    return {
      quill: null,
      editor: null,
      editorConfig: {},
      modules: {
        toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar,
        markdownShortcuts: {}
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
      this.prepareModules()
      this.setQuillElement()
      this.setEditorElement()
      this.handleDynamicStyles()
      this.checkForInitialContent()
      this.checkForCustomImageHandler()
    },

    setQuillElement() {
      let editorConfig = {
        debug: false,
        modules: this.modules,
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false,
      };
      this.prepareEditorConfig(editorConfig)
      this.quill = new Quill(this.$refs.quillContainer, editorConfig)
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    handleDynamicStyles() {
      if ( this.imageResizeActive ) {
        this.editor.classList.add('imageResizeActive');
      }
    },

    prepareModules() {
      this.registerBuiltInModules()
      this.registerCustomModules()
    },

    registerBuiltInModules() {
      Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
    },

    registerCustomModules() {
      if ( this.customModules !== undefined ) {
        this.customModules.forEach(customModule => {
          Quill.register('modules/' + customModule.alias, customModule.module)
        })
      }
    },

    prepareEditorConfig(editorConfig) {
      if (Object.keys(this.editorOptions).length > 0 && this.editorOptions.constructor === Object) {
        if (this.editorOptions.modules && typeof this.editorOptions.modules.toolbar !== 'undefined') {
        // We don't want to merge default toolbar with provided toolbar.
          delete editorConfig.modules.toolbar;
        }
        merge(editorConfig, this.editorOptions);
      }
    },

    checkForInitialContent() {
      if (this.value) {
        this.editor.innerHTML = this.filteredInitialContent
      }
      //
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
        let editorContent = this.editor.innerHTML
        if ( editorContent === '<p><br></p>' ) editorContent = ''
        this.$emit('input', editorContent)
      })
    },

    customImageHandler(image, callback) {
      this.$refs.fileInput.click();
    },

    emitImageInfo($event) {
      const resetUploader = function() {
        var uploader = document.getElementById('file-upload');
        uploader.value = '';
      }

      let file = $event.target.files[0]
      let Editor = this.quill
      let range = Editor.getSelection();
      let cursorLocation = range.index
      this.$emit('imageAdded', file, Editor, cursorLocation, resetUploader)
    }

  }
}
</script>

<style src="quill/dist/quill.snow.css"></style>
<style src="./styles/vue2-editor.scss" lang='scss'></style>
