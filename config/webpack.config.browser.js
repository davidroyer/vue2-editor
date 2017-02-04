var webpack = require('webpack')
var merge = require('webpack-merge')
var base = require('./webpack.config.base')

var outputFile = 'vue2-editor'
var globalName = 'VueEditor'

module.exports = merge(base, {
  output: {
    path: './dist',
    filename: outputFile + '.browser.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  externals: {
    // Put external libraries like lodash here
    // With their global name
    // Example: 'lodash': '_'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      mangle: false,
    }),
  ],
})
