var merge = require('webpack-merge')
var base = require('./webpack.config.base')

var outputFile = 'vue2-editor'
var globalName = 'VueEditor'

module.exports = merge(base, {
  output: {
    path: './dist',
    filename: outputFile + '.common.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
})
