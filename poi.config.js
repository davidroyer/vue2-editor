const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './dev/index.js'),
	html: {
		title: 'Vue2Editor'
	},
	filename: {
		js: 'vue2-editor.js'
	},
	extractCSS: false
};
