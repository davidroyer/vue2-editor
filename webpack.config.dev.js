const merge = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const BASE_CONFIG = require( './webpack.config' );
const PROJECT_ROOT = require( 'path' ).resolve( __dirname );

module.exports = merge( BASE_CONFIG, {
  output: {
    path: './',
    filename: 'index.js',
    publicPath: ''
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${ PROJECT_ROOT }/demo/index.html`,
      inject: 'head'
    })
  ]
} );
