const webpack = require("webpack");
const isDev = process.env.NODE_ENV === "development";
const buildingDemos = process.env.BUILD_TYPE === "demos";
const buildingPlugin = process.env.NODE_ENV === "production" && !buildingDemos;
const buildDirectory = buildingDemos ? "public-demos" : "dist";

module.exports = {
  css: {
    extract: false
  },

  outputDir: buildDirectory,

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
    if (buildingPlugin) {
      config.externals({
        quill: "quill"
      });
    }
  }
};
