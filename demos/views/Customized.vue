<template>
  <div class="customized">
    <h1>Various Customizations Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <button @click="editorIsDisabled = !editorIsDisabled">Toggle</button>
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            ref="myQuillEditor"
            v-model="content"
            :editor-options="editorOptions"
            :disabled="editorIsDisabled"
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @ready="onEditorReady"
            @selection-change="onSelectionChange"
          >
          </vue-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    editorOptions: {
      modules: {},
      placeholder: "newww placeholder text here ..."
    },
    editorIsDisabled: false,
    content: "<h1>Starting content</h1>"
  }),

  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    onSelectionChange(range, oldRange, source) {
      console.log("Selection change!", range);
    }
  }
};
</script>
