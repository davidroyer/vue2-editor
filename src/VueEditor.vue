<template>
  <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import _Quill from "quill";
import defaultOptions from "./helpers/default-options";
import { objectAssignPolyfillHandler } from "./helpers/polyfills";
import { configSettingsMerger } from "./helpers/config-settings-merger";

const Quill = window.Quill || _Quill;

export default {
  name: "VueEditor",

  props: {
    deltaContent: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data: () => ({
    quill: null,
    config: {},
    defaultOptions
  }),

  mounted() {
    configSettingsMerger(this.defaultOptions, this.options);
    this.registerPrototypes();
    this.initialize();
  },

  methods: {
    initialize() {
      if (this.$el) {
        this.config = Object.assign({}, this.options);
        this.quill = new Quill(this.$refs.editor, this.config);
        this.handleInitialContent();
        this.registerEditorEventListeners();
        this.$emit("ready", this.quill);
      }
    },

    registerPrototypes() {
      Quill.prototype.getHTML = function() {
        return this.container.querySelector(".ql-editor").innerHTML;
      };
      Quill.prototype.getWordCount = function() {
        return this.container.querySelector(".ql-editor").innerText.length;
      };
    },

    registerEditorEventListeners() {
      this.quill.on("text-change", this.handleTextChange);
      this.quill.on("selection-change", this.handleSelectionChange);
      this.listenForEditorEvent("text-change");
      this.listenForEditorEvent("selection-change");
      this.listenForEditorEvent("editor-change");
    },

    listenForEditorEvent(type) {
      this.quill.on(type, (...args) => {
        this.$emit(type, ...args);
      });
    },

    handleInitialContent() {
      if (this.value) this.quill.root.innerHTML = this.value; // Set initial editor content
    },

    handleSelectionChange(range, oldRange) {
      if (!range && oldRange) this.$emit("blur", this.quill);
      else if (range && !oldRange) this.$emit("focus", this.quill);
    },

    handleTextChange() {
      let editorContent =
        this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
      this.$emit("input", editorContent);
    }
  },

  watch: {
    value(val) {
      if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
        this.quill.root.innerHTML = val;
      }
    },
    disabled(status) {
      if (this.quill) this.quill.enable(!status);
    }
  },

  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  }
};
</script>

<style src="quill/dist/quill.snow.css">
</style>
<style src="./styles/vue2-editor.scss" lang='scss'>
</style>
