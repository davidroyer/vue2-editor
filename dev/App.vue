<template>
<div id="app">
  <div class="container grid-960">
    <h1>Vue2Editor - Upload Images Example </h1>
    <div class="columns">
      <div class="editorWrapper column col-6 col-sm-12">
        <vue-editor
          id="editor1"
          :editorOptions="editorSettings"
          v-model="editor1Content">
        </vue-editor>
          <!--  -->
        <button class="btn btn-primary" @click="saveContent(editor1Content)">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import {
  VueEditor,
  Quill
} from '../src/index.js'
import axios from 'axios'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register(Font, true);
Quill.register('modules/imageDrop', ImageDrop)


export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      editor1Content: '<h1>Editor 1 Starting Content</h1>',
      editor2Content: '<h1>Editor 2 Starting Content</h1>',
      showPreview: true,
      content: '<h1>Html For Editor</h1>',
      editor1IsDisabled: false,
      editor2IsDisabled: false,
      editorSettings: {
        modules: {
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true
          // imageResize: true
        }
      },
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        ['image', 'code-block']
      ]
    }
  },
  created() {

  },
  methods: {
    setEditor1(editor) {
      this.editor1Content = 'Set Editor 1 Content'
    },

    setEditor2(editor) {
      this.editor2Content = 'Set Editor 2 Content'
    },

    saveContent(content) {
      console.log(content);
      // console.log(this.editorContent);
    },

    toggleDisabledForEditor1() {
      this.editor1IsDisabled = !this.editor1IsDisabled
    },
    toggleDisabledForEditor2() {
      this.editor2IsDisabled = !this.editor2IsDisabled
    },
    sendUrlToEditor() {
      console.log('worked');
    },
    handleImageAdded(file, Editor, cursorLocation) {

      console.log('Using Method in Parent');

      var formData = new FormData();
      formData.append('image', file)




      axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers:{
          'Authorization': 'Client-ID ' + CLIENT_ID
        },
        data: formData
      })
      .then((result) => {
        console.log(result);
        let url = result.data.data.link
        Editor.insertEmbed(cursorLocation, 'image', url);
      })
      .catch((err) => {
        console.log(err);
      })
      // axios({
      //   url: CLOUDINARY_URL,
      //   method: 'POST',
      //   headers:{
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   data: formData
      // })
      // .then((result) => {
      //   let url = result.data.url
      //   Editor.insertEmbed(cursorLocation, 'image', url);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })

    },
    uploadImage(file, Editor, cursorLocation) {
      var formData = new FormData();
      // formData.append('file', file)
      // formData.append('upload_preset', UPLOAD_PRESET)
      //
      //

      // var settings = {
      //   "async": true,
      //   "crossDomain": true,
      //   "url": "https://api.imgur.com/3/image",
      //   "method": "POST",
      //   "headers": {
      //     "authorization":
      //   },
      //   "processData": false,
      //   "contentType": false,
      //   "mimeType": "multipart/form-data",
      //   "data": formData
      // }


      axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'authorization': 'Client-ID' + CLIENT_ID
        },
        data: formData
      })
      .then((result) => {
        let url = result.data.url
        Editor.insertEmbed(cursorLocation, 'image', url);
      })
      .catch((err) => {
        console.log(err);
      })

      //
      // axios({
      //   url: CLOUDINARY_URL,
      //   method: 'POST',
      //   headers:{
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   data: formData
      // })
      // .then((result) => {
      //   let url = result.data.url
      //   Editor.insertEmbed(cursorLocation, 'image', url);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
    }
  }
}
</script>

<style>
/*.flexWrapper {
      display: flex;
}
.editorWrapper {
    flex-basis: 50%;
}
.quillWrapper {
  position: relative;
  z-index: 99999;
}
*/

#preview {
  background: #f6f6f6;
  border-left: 3px solid gray;
  padding: 2em;
  margin-left: 1em;
}
@media (min-width: 601px) {
  #preview {
    width: 47%;
  }
}
.ql-disabled {
    opacity: 0.5;
    background: rgba(153, 153, 153, 0.2);
}

</style>
