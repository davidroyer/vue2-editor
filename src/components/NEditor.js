/* eslint-disable no-console */
import Vue from "vue";

let Quill;
if (!Vue.prototype.$isServer) Quill = require("quill");

export default {
  props: {
    content: {
      type: String,
      default: ""
    }
  },

  mounted() {
    const el = this.$refs.nEditor;
    // const Quill = await require('quill')
    this.quill = new Quill(el, {
      modules: { toolbar: true },
      theme: "snow"
    });

    this.handleInitialContent();
    this.quill.on("text-change", this.handleTextChange);
    // import('quill').then((module) => {
    //   const Quill = module.default
    //   const el = this.$refs.nEditor
    //   this.quill = new Quill(el, {
    //     modules: { toolbar: true },
    //     theme: 'snow'
    //   })

    //   this.handleInitialContent()
    //   this.quill.on('text-change', this.handleTextChange)
    // })
  },

  methods: {
    handleInitialContent() {
      if (this.content) this.quill.root.innerHTML = this.content;
      // if (this.value) this.$refs.qEditor.innerHTML = this.value // Set initial editor content
    }
  },

  render() {
    return (
      <div className="quillWrapper">
        <div ref="nEditor" />
      </div>
    );
  }
};
