const { resolve } = require('path')

module.exports = function nuxtVue2Editor(moduleOptions) {
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue2-editor.js',
    moduleOptions
  })
}

module.exports.meta = require('../package.json')
