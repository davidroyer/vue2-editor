<template>
  <div id="app">
    <!-- <button @click="deleteImage">Delete</button> -->
    <button @click="savePost">Save Post</button>
    <div>new</div>
    <VueEditor v-model="content" use-markdown-shortcuts />
    <!-- <NuxtEditor /> -->
    <br />
    <hr />
    <pre>{{ posts }}</pre>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import axios from "axios";
// import { NuxtEditor } from "./index";
// import Quill from 'quill';
// import { ImageDrop } from 'quill-image-drop-module';
// import ImageResize from "quill-image-resize-module";
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register("modules/imageResize", ImageResize);

// eslint-disable-next-line no-console
// console.log('TCL: Quill', Quill);
export default {
  // components: { NuxtEditor },

  data: () => ({
    content: "<h1>Starting content 3</h1>",
    posts: [],
    numberOfPosts: null
  }),

  mounted() {
    this.getPosts();
  },

  methods: {
    async savePost() {
      const content = JSON.stringify(this.content);
      console.log("🚀 ~ file: App.vue ~ line 75 ~ savePost ~ content", content);
      const newPostNumber = this.numberOfPosts + 1;

      const postData = {
        title: `Post ${newPostNumber}`,
        slug: `post-${newPostNumber}`,
        content: this.content
      };

      const stringifiedData = JSON.stringify(postData);

      console.log(
        "🚀 ~ file: App.vue ~ line 83 ~ savePost ~ stringifiedData",
        stringifiedData
      );
      var dbConfig = {
        method: "post",
        url: "https://devdb-75cc.restdb.io/rest/posts",
        headers: {
          "x-apikey": "610201c449cd3a5cfbd22d63",
          "Content-Type": "application/json"
        },
        data: stringifiedData
      };

      const { data } = await axios(dbConfig);
      console.log("🚀 ~ file: App.vue ~ line 88 ~ savePost ~ data", data);
    },
    async getPosts() {
      var dbConfig = {
        method: "get",
        url: "https://devdb-75cc.restdb.io/rest/posts",
        headers: {
          "x-apikey": "610201c449cd3a5cfbd22d63"
        }
      };

      const { data } = await axios(dbConfig);
      console.log("🚀 ~ file: App.vue ~ line 79 ~ getPosts ~ data", data);
      this.posts = data;
      // this.content = data[2].content;
      this.numberOfPosts = data.length;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
