<template>
<div class="quill-editor">
  <pre>{{content}}</pre>
  <slot name="toolbar"></slot>
  <div id="editor" ref="editor" @keyup.delete="handleDelete"></div>
</div>
</template>

<script>
import VQuill from "quill";
const Quill = window.Quill || VQuill;
import { defaultOptions } from "./helpers/defaults";
if (typeof Object.assign != "function") {
  Object.defineProperty(Object, "assign", {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      const to = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
export default {
  name: "VueEditor",
  data() {
    return {
      quill: null,
      _options: {},
      content: "",
      defaultOptions
    };
  },
  props: {
    editorContent: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    // Init Quill instance
    initialize() {
      if (this.$el) {
        // Options
        this._options = Object.assign(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        );
        // Instance
        this.quill = new Quill(this.$refs.editor, this._options);

        this.quill.enable(false);

        // Set editor content

        if (this.value) {
          this.quill.pasteHTML(this.value);
          this.quill.root.innerHTML = this.value;
        }
        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true);
        }
        // Mark model as touched if editor lost focus
        this.quill.on("selection-change", range => {
          if (!range) {
            this.$emit("blur", this.quill);
          } else {
            this.$emit("focus", this.quill);
          }
        });
        // Update model if text changes
        this.quill.on("text-change", (delta, oldDelta, source) => {
          console.log(this.$refs.editor);
          let html = this.$refs.editor.children[0].innerHTML;

          const quill = this.quill;
          const text = this.quill.getText();

          if (html === "<p><br></p>") html = "";
          this.content = html;
          console.log("this.content", this.content);
          console.log("this", this);
          console.log("this.quill", this.quill);
          this.$emit("input", this.content);
          this.$emit("change", {
            html,
            text,
            quill
          });
        });
        // Emit ready event
        this.$emit("ready", this.quill);
      }
    },

    handleDelete() {
      const blockquoteButton = document.querySelector(".ql-blockquote");
      const isEmptyBlockQuote =
        this.value === "<blockquote><br></blockquote>" ? true : false;
      if (
        blockquoteButton.classList.contains("ql-active") &&
        isEmptyBlockQuote
      ) {
        setTimeout(() => {
          blockquoteButton.click();
        }, 250);
      }
    }
  },
  watch: {
    // Watch content change
    content(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.content) {
          this.content = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    // Watch content change
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.content) {
          this.content = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    // Watch disabled change
    disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal);
      }
    }
  }
};
</script>

<style src="quill/dist/quill.snow.css">
</style>
<style src="./styles/vue2-editor.scss" lang='scss'>
</style>
