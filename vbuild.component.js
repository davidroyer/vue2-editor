module.exports = {
  entry: 'src/index.js',
  // then user can access `window.Vue2Editor` in browser as well
  moduleName: 'Vue2Editor',
  html: false,
  minimize: true,
  sourceMap: false,
  extract: false,
  filename: {
    js: 'index.js',
    // css: 'vue2Editor.css'
  },
  // this will not copy ./static/** to ./dist/**
  copy: false
}
