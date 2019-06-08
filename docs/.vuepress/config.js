module.exports = {
  head: [
    // [
    //   "link",
    //   {
    //     rel: "stylesheet",
    //     type: "text/css",
    //     href: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css"
    //   }
    // ],
    [
      "script",
      {
        src: "https://unpkg.com/quill"
      }
    ],    
    [
      "script",
      {
        src: "https://unpkg.com/vue2-editor@alpha"
      }
    ]
  ],
  plugins: [require("./plugin.js")],
  locales: {
    "/": {
      lang: "en-US",
      title: "Vue2Editor",
      description: "Vue2Editor for Vue.js"
    }
  },
  themeConfig: {
    repo: "David Royer/vue2-editor",
    docsDir: "docs",
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Release Notes",
            link: "https://github.com/David Royer/vue2-editor/releases"
          }
        ],
        sidebar: ["/installation.md", "/started.md", "/usage.md"]
      }
    }
  }
};
