<template>
  <div class="basic">
    <h1>Basic Example</h1>

    <div class="container grid-960">
      <div class="columns">
        <div id="editor-boundary" class="editorWrapper column col-6 col-sm-12">
          <vue-editor
            ref="editor"
            v-model="content"
            :editor-toolbar="toolbarSettings"
          >
          </vue-editor>

          <vue-editor
            ref="editor"
            v-model="content"
            :editor-options="editorSettings"
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
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"]
    ],
    editorSettings: {
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }]
        ]
      },
      placeholder: "Custom placeholder text here ..."
    },
    content: "<h1>Starting content</h1>"
  }),

  methods: {}
};
</script>
