const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './dev/index.js'),
	html: {
		title: 'Vue2Editor'
	},
	extractCSS: false
};
