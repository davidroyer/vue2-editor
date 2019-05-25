module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    // entry: "./src/lib.js",
    output: {
      // libraryExport: "default",
      filename: "vue2-editor",
      // libraryTarget: "window",
      library: "Vue2Editor"
    }
  }
};

// genHTML: false,
