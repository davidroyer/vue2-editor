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
  },
  chainWebpack: config => {
    config.plugins.delete("html");
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
  }
};

// genHTML: false,
