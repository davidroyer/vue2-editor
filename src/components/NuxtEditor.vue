<template>
  <div id="editor" ref="editor"></div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

console.log("FROM NUXT EDITOR");

let Quill;

export default {
  data: () => ({
    quill: {},
    content: null
  }),

  async mounted() {
    Quill = (await import("quill")).default;

    const editorElement = this.$refs.editor;

    this.quill = new Quill(editorElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }, { list: "check" }]
        ]
      },
      theme: "snow",
      // formats: ["bold", "underline", "header", "italic"],
      placeholder: "Your words are worth being read..."
    });
  }
};
</script>

<style></style>
