module.exports = {
  banner: true,

  input: "src/lib.js",

  output: {
    moduleName: "Vue2Editor",
    extractCSS: false,
    format: ["esm", "umd", "cjs"],
    fileName({ format }, defaultFileName) {
      if (format === "esm") return "vue2-editor.esm.js";
      if (format === "umd") return "vue2-editor.js";
      if (format === "cjs") return "vue2-editor.cjs.js";
      return defaultFileName;
    },
    sourceMapExcludeSources: true
  },

  babel: {
    minimal: true
  },

  plugins: {
    vue: true,
    alias: {
      resolve: [".vue", ".js"],
      "@/helpers": "./../helpers/"
    }
  },

  extendConfig(config, { format }) {
    if (format === "umd") {
      config.output.minify = true;
      config.env = Object.assign({}, config.env, {
        NODE_ENV: "production"
      });
    }
    return config;
  }
};
