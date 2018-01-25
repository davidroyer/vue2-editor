const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './dev/index.js'),
	vendor: false,
	filename: {
    js: 'vue2-editor.js'
  },
	extractCSS: false,
	transformModules: ['quill-image-drop-module','quill-image-resize-module']
};
