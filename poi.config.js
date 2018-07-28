const path = require("path");
const webpack = require("webpack");

module.exports = {
  extractCSS: false,
  entry: path.resolve(__dirname, "./dev/index.js"),
  vendor: false,
  // transformModules: ["quill-image-drop-module"],

  filename: {
    js: "vue2-editor.js"
    // css: 'vue2-editor.css'
  }
};
