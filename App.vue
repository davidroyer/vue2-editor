<template>
  <div id="app">
    <h1>This is App.js</h1>
    <vue-editor
      :editorContent="contentForEditor"
      @saveContent="handleSaveContent">
      <!-- <template slot="buttonText">
        Custom Save Button
      </template> -->

    </vue-editor>

    <span>{{output}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contentForEditor: "Some content here",
      output: 'Starts'
    }
  },

  methods: {
    handleSaveContent: function (contentsToBeSaved) {
      this.output = 'HELLO'
    }
  }
}
</script>

<style lang="css">
</style>
