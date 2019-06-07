const { version } = require('../../package.json')

module.exports = (/*options, ctx*/) => ({
  async enhanceAppFiles () {
    const code = `export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $version () {
        return '${version}'
      } 
    }
  })
}`
    return [{
      name: 'vuepress-plugin-vue-cli-plugin-p11n',
      content: code
    }]
  }
})
