const webpack = require("webpack");
const isDev = process.env.NODE_ENV === "development";
const buildingDemos = process.env.BUILD_TYPE === "demos";

module.exports = {
  css: {
    extract: false
  },
  outputDir: buildingDemos ? "public-demos" : "dist",
  configureWebpack: config => {
    if (isDev || buildingDemos) {
      config.plugins.push(
        new webpack.ProvidePlugin({
          "window.Quill": "quill/dist/quill.js",
          Quill: "quill/dist/quill.js"
        })
      );
    }
  },

  chainWebpack: config => {
    config.externals({
      quill: "quill"
    });
  }
};
