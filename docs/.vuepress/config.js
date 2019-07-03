// const path = require("path");
const { version } = require("../../package.json");

module.exports = {
  head: [
    // [
    //   "script",
    //   {
    //     src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"
    //   }
    // ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"
      }
    ],
    [
      "script",
      {
        src: "https://unpkg.com/quill"
      }
    ],
    [
      "script",
      {
        src: `https://unpkg.com/vue2-editor@${version}`
      }
    ]
  ],
  plugins: [
    require("./plugin.js"),
    // "live",
    // "demo-block",
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-12345678-9"
      }
    ]
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "Vue2Editor",
      description:
        "Your Vue.js editor for rich text editing built with Vue.js and Quill.js"
    }
  },
  themeConfig: {
    repo: "davidroyer/vue2-editor",
    docsDir: "docs",
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        editLinkText: "Edit this page on GitHub",
        nav: [
          {
            text: "Release Notes",
            link: "https://github.com/davidroyer/vue2-editor/releases"
          }
        ],
        sidebar: [
          // "/installation.md",
          "/guide.md",
          "/examples/",
          "/api.md"
          // "/notes.md"
        ]
      }
    }
  }
};
