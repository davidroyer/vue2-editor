const path = require("path");

module.exports = {
  extractCSS: false,
  entry: path.resolve(__dirname, "./dev/index.js"),
  vendor: false,
  filename: {
    js: "vue2-editor.js"
  }
  // extendWebpack(config) {
  // 	config.plugin('provide') // <-- give it a name
  // 		.use(webpack.ProvidePlugin, [{
  // 			'window.Quill': 'quill/dist/quill.js',
  // 			'Quill': 'quill/dist/quill.js',
  // 		}])
  // }
};
