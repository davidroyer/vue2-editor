<template>
  <div id="quillWrapper">
      <div ref="quillContainer" id="quill-container"></div>
      <button @click="saveContent">Save Content</button>
      <div ref="livePreview" v-if="showPreview"></div>
  </div>
</template>

<script>
import Quill from 'quill'
require('../node_modules/quill/dist/quill.core.css')
require('../node_modules/quill/dist/quill.snow.css')

export default {
  name: 'quill',
  props: {
    editorContent: String,

    showPreview: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },

  data: function () {
    return {
      quill: null,
      editor: null,
      toolbar: [
          [{ header: [1, 2, 3, 4, 5 , 6, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image', 'code-block']
        ]
    }
  },

  mounted: function () {
    const vm = this

    vm.quill = new Quill(vm.$refs.quillContainer, {
      modules: {
        toolbar: this.toolbar
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    });

    vm.editor = document.querySelector('.ql-editor')

    if ( vm.$refs.livePreview !== undefined || false ) {
      vm.quill.on('text-change', function() {
        vm.$refs.livePreview.innerHTML = vm.editor.innerHTML
        vm.$emit('editor-updated', vm.editor.innerHTML)
      });
    }

  },

  watch: {
    editorContent: function () {
      this.editor.innerHTML = this.editorContent
    }
  },

  methods: {
    emitOnChange: function (value) {
      this.$emit('increment', value)
    },

    saveContent: function (value) {
      console.log(this.editor.innerHTML)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#quill-container {
  height: 400px;
}

</style>
