const { resolve } = require("path");

export default function nuxtVue2Editor() {
  this.addPlugin({
    mode: "client",
    src: resolve(__dirname, "plugin.js"),
    fileName: "vue2-editor.js"
  });
}

module.exports.meta = require("../package.json");
