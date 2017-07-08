<template>
<div class="quillWrapper">
  <div ref="quillContainer" :id="id"></div>
  <input v-if="useImageUploader" @change="customImageHanlder ? sendFileToParent($event) : handleUpload($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
</div>
</template>
<script>
import Quill from 'quill'
import axios from 'axios'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkrcloudinary/upload'
const UPLOAD_PRESET = 'ptvbj5nu'

var defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],

  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],

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
    functionProp: Function
  },

  data() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar,
      useImageUploader: true,
      customImageHanlder: true
    }
  },

  mounted() {
    this.initializeVue2Editor()
    this.handleUpdatedEditor()

  },
  created() {
    this.functionProp
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
      this.setQuillElement()
      this.setEditorElement()
      this.checkForInitialContent()
    },

    setQuillElement() {
      this.quill = new Quill(this.$refs.quillContainer, {
        modules: {
          toolbar: {
            container: this.toolbar,  // Selector for toolbar container
            handlers: {
                'image': this.imageHandler
            }
          }
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false,
      })
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`)
    },

    checkForInitialContent() {
      this.editor.innerHTML = this.value || ''
    },

    handleUpdatedEditor() {
      this.quill.on('text-change', () => {
        this.$emit('input', this.editor.innerHTML)
      })
    },
    imageHandler(image, callback) {
      this.$refs.fileInput.click();
      // var range = this.quill.getSelection();

      // this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);

      // var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
      // var IMGUR_API_URL = 'https://api.imgur.com/3/image';
      console.log(image);
      // var range = this.quill.getSelection();
      // alert('fired!!!')
      // var value = prompt('What is the image URL');
      // this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    },
    handleUpload($event) {
      console.log('Using Method in VueEditor');
      let vm = this
      var file = $event.target.files[0]
      var formData = new FormData();

      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      var xhrObj = new XMLHttpRequest();
      // xhrObj.upload.addEventListener("loadstart", loadStartFunction, false);
      // xhrObj.upload.addEventListener("progress", progressFunction, false);
      // xhrObj.upload.addEventListener("load", transferCompleteFunction, false);
      xhrObj.open("post", CLOUDINARY_URL);
      xhrObj.send(formData);

      xhrObj.onload = function() {
        if (this.status == 200) {
          let uploadResponse = JSON.parse(this.response);
          let url = uploadResponse.url

          let range = vm.quill.getSelection();
          let cursorLocation = range.index
          vm.quill.insertEmbed(range.index, 'image', url, Quill.sources.API);
          // var image = document.createElement('img');
          // image.src = resp.dataUrl;
          // document.body.appendChild(image);
        };
      };
    },
    sendFileToParent($event) {
      let file = $event.target.files[0]
      let Editor = this.quill
      let range = Editor.getSelection();
      let cursorLocation = range.index
      this.$emit('imageAdded', file, Editor, cursorLocation)
    },
    // handleUpload($event) {
    //   var file = $event.target.files[0]
    //   var formData = new FormData();
    //   console.log(file);
    //   formData.append('file', file)
    //   formData.append('upload_preset', UPLOAD_PRESET)
    //   axios({
    //     url: CLOUDINARY_URL,
    //     method: 'POST',
    //     headers:{
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     data: formData
    //   })
    //   .then((result) => {
    //     let url = result.data.url
    //     var range = this.quill.getSelection();
    //     this.quill.insertEmbed(range.index, 'image', url, Quill.sources.API);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }
  }
}
</script>

<style>
  #quill-container {
    height: 400px;
  }
</style>
