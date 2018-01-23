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
import {icons, buildToolbar} from './icons'


var defaultToolbar = [
  [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],
    // { 'font': [] },
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

  [{ 'indent': '-1'}, { 'indent': '+1' }],

  [{ 'color': [] }, { 'background': [] }],
  // [{ 'align': ''}, { 'align': 'center' }, { 'align': 'right' }],
  [{ 'align': ''}, {}],
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
    boldToolbar: {
      type: Boolean,
      default: false
    },
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
      this.checkForUsingNewToolbar()
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

    checkForUsingNewToolbar() {
      this.boldToolbar === true ? buildToolbar(icons) : ''
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

  .ql-snow .ql-thin,
  .ql-snow .ql-stroke.ql-thin {
    stroke-width: 1px !important;
  }
  .quillWrapper .ql-snow.ql-toolbar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .quillWrapper .ql-snow.ql-toolbar button {
    margin: 1px;
  }

  .quillWrapper .ql-snow.ql-toolbar .ql-formats {
    display: inline-flex;
  }

  .quillWrapper .ql-snow.ql-toolbar button {
    padding: 3px 7px;
    width: 25px !important;
    float: none !important;
    margin: 1px 2px;
  }
  .quillWrapper .ql-editor ul[data-checked="true"] > li::before,
  .quillWrapper .ql-editor ul[data-checked="false"] > li::before {
    font-size: 1.35em;
    vertical-align: baseline;
    bottom: -0.065em;
    font-weight: 900;
    color: #222;
  }
  .quillWrapper .ql-snow .ql-stroke {
    stroke: rgba(63, 63, 63, 0.95);
    stroke-linecap: square;
    stroke-linejoin: initial;
    stroke-width: 1.7px;
  }
  .quillWrapper .ql-toolbar .ql-picker-label {
    font-size: 14px;
    padding: 3px 3px 3px 7px;
  }

  .editorWrapper .quillWrapper .ql-snow .ql-picker.ql-header {
    height: initial !important;
    width: 110px !important;
    border: 1px solid #ccc !important;
  }

  .editorWrapper .quillWrapper .ql-snow .ql-picker.ql-header .ql-picker-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .editorWrapper .quillWrapper .ql-snow .ql-picker.ql-font {
    height: initial !important;
    width: 110px !important;
    border: 1px solid #ccc !important;
  }

  .ql-toolbar.ql-snow .ql-picker .ql-picker-label {
    /* border: 1px solid #ccc !important; */
    text-align: center;
  }

  .quillWrapper .ql-snow .ql-active svg.svg-inline--fa path {
    fill: #06c !important;
  }
  .quillWrapper .ql-toolbar.ql-snow .ql-formats {
    margin: 5px 15px 5px 2px !important;
  }

  svg.svg-inline--fa path {
    fill: rgba(68, 68, 68, 0.85) !important;
  }

  .editorWrapper
    .quillWrapper
    .ql-snow
    .ql-picker:not(.ql-color-picker):not(.ql-icon-picker)
    svg {
    right: initial !important;
    position: relative;
    display: block;
    /* width: 18px;
    height: 18px; */
    margin-left: 5px;
    margin-top: 0;
    top: initial;
  }
  .editorWrapper .quillWrapper .ql-toolbar.ql-snow {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
  }
  .ql-snow.ql-toolbar button,
  .ql-snow .ql-toolbar button {
    /* width: initial; */
  }
  .ql-snow .ql-color-picker .ql-picker-label svg,
  .ql-snow .ql-icon-picker .ql-picker-label svg {
    /* width: 18px !important;
      height: initial !important; */
  }
  .ql-snow .ql-color-picker,
  .ql-snow .ql-icon-picker {
  }
  .ql-snow .ql-color-picker,
  .ql-snow .ql-icon-picker {
    /* width: 25px;
      height: 25px !important; */
  }
  .ql-snow.ql-toolbar button svg,
  .ql-snow .ql-toolbar button svg {
    float: none !important;
  }

  .ql-snow.ql-toolbar button:hover,
  .ql-toolbar .ql-picker-label:hover {
    background: #eee;
  }
  .ql-snow.ql-toolbar button.ql-active,
  .ql-toolbar .ql-picker-label.ql-active {
    background: #e7e7e7;
  }

  .ql-editor ol li:not(.ql-direction-rtl),
  .ql-editor ul li:not(.ql-direction-rtl) {
    padding-left: 1em;
  }
  .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 2.5em;
  }
  .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 5em;
  }
  svg.fa-underline {
    top: 1px;
    position: relative;
    height: 19px;
  }
/* New */
.ql-toolbar svg {
  height: 16px !important;
}
.ql-toolbar path {
  fill: rgba(46, 46, 46, 0.80);
}
.ql-clean svg {
  height: 18px !important;
}

.ql-underline svg {
  top: 1px;
  position: relative;
  height: 17px !important;
}
.ql-snow.ql-toolbar button, .ql-snow .ql-toolbar button {
  width: 24px !important;
}

.ql-image svg {
  height: 20px !important;
  left: 3px;
  position: relative;
  top: -1px;
}

.ql-color-picker svg {
  height: 21px !important;
  position: relative;
  top: -2px;
}
</style>
