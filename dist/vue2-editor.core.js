/*!
 * vue2-editor v2.10.1-next.9 
 * (c) 2019 David Royer
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.Vue2Editor = {}, global.Vue));
}(this, function (exports, Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var defaultToolbar = [[{
    header: [false, 1, 2, 3, 4, 5, 6]
  }], ["bold", "italic", "underline", "strike"], // toggled buttons
  [{
    align: ""
  }, {
    align: "center"
  }, {
    align: "right"
  }, {
    align: "justify"
  }], ["blockquote", "code-block"], [{
    list: "ordered"
  }, {
    list: "bullet"
  }, {
    list: "check"
  }], [{
    indent: "-1"
  }, {
    indent: "+1"
  }], // outdent/indent
  [{
    color: []
  }, {
    background: []
  }], // dropdown with defaults from theme
  ["link", "image", "video"], ["clean"] // remove formatting button
  ];

  var oldApi = {
    props: {
      customModules: Array
    },
    methods: {
      registerCustomModules: function registerCustomModules(Quill) {
        if (this.customModules !== undefined) {
          this.customModules.forEach(function (customModule) {
            Quill.register("modules/" + customModule.alias, customModule.module);
          });
        }
      }
    }
  };

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * Performs a deep merge of `source` into `target`.
   * Mutates `target` only but not its objects and arrays.
   *
   */
  function mergeDeep(target, source) {
    var isObject = function isObject(obj) {
      return obj && _typeof(obj) === "object";
    };

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    Object.keys(source).forEach(function (key) {
      var targetValue = target[key];
      var sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
      } else {
        target[key] = sourceValue;
      }
    });
    return target;
  }

  //
  var Quill;
  var MarkdownShortcuts;

  if (!Vue.prototype.$isServer) {
    console.log("In !Vue.prototype.$isServer");
    Quill = require("quill");
    MarkdownShortcuts = require("@/helpers/markdown-shortcuts").default;
    console.log("TCL: MarkdownShortcuts", MarkdownShortcuts);
  }

  var script = {
    mixins: [oldApi],
    props: {
      id: {
        type: String,
        default: "quill-container"
      },
      placeholder: {
        type: String,
        default: ""
      },
      value: {
        type: String,
        default: ""
      },
      disabled: {
        type: Boolean
      },
      editorToolbar: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      editorOptions: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },
      useCustomImageHandler: {
        type: Boolean,
        default: false
      },
      useMarkdownShortcuts: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        quill: null
      };
    },
    watch: {
      value: function value(val) {
        // eslint-disable-next-line eqeqeq
        if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
          this.quill.root.innerHTML = val;
        }
      },
      disabled: function disabled(status) {
        this.quill.enable(!status);
      }
    },
    mounted: function mounted() {
      // this.$parent.$once('hook:mounted', () => {
      //   // eslint-disable-next-line no-console
      //   console.log('in mounted hook')
      //   this.$parent.$forceUpdate()
      // })
      this.registerCustomModules(Quill);
      this.registerPrototypes();
      this.initializeEditor();
    },
    beforeDestroy: function beforeDestroy() {
      this.quill = null;
      delete this.quill;
    },
    methods: {
      initializeEditor: function initializeEditor() {
        this.setupQuillEditor();
        this.checkForCustomImageHandler();
        this.handleInitialContent();
        this.registerEditorEventListeners();
        this.$emit("ready", this.quill);
      },
      setupQuillEditor: function setupQuillEditor() {
        var editorConfig = {
          debug: false,
          modules: this.setModules(),
          theme: "snow",
          placeholder: this.placeholder ? this.placeholder : "",
          readOnly: this.disabled ? this.disabled : false
        };
        this.prepareEditorConfig(editorConfig);
        this.quill = new Quill(this.$refs.quillContainer, editorConfig);
      },
      setModules: function setModules() {
        var modules = {
          toolbar: this.editorToolbar.length ? this.editorToolbar : defaultToolbar
        };

        if (this.useMarkdownShortcuts) {
          Quill.register("modules/markdownShortcuts", MarkdownShortcuts, true);
          modules.markdownShortcuts = {};
        }

        return modules;
      },
      prepareEditorConfig: function prepareEditorConfig(editorConfig) {
        if (Object.keys(this.editorOptions).length > 0 && this.editorOptions.constructor === Object) {
          if (this.editorOptions.modules && typeof this.editorOptions.modules.toolbar !== "undefined") {
            // We don't want to merge default toolbar with provided toolbar.
            delete editorConfig.modules.toolbar;
          }

          mergeDeep(editorConfig, this.editorOptions);
        }
      },
      registerPrototypes: function registerPrototypes() {
        Quill.prototype.getHTML = function () {
          return this.container.querySelector(".ql-editor").innerHTML;
        };

        Quill.prototype.getWordCount = function () {
          return this.container.querySelector(".ql-editor").textContent.length;
        };
      },
      registerEditorEventListeners: function registerEditorEventListeners() {
        this.quill.on("text-change", this.handleTextChange);
        this.quill.on("selection-change", this.handleSelectionChange);
        this.listenForEditorEvent("text-change");
        this.listenForEditorEvent("selection-change");
        this.listenForEditorEvent("editor-change");
      },
      listenForEditorEvent: function listenForEditorEvent(type) {
        var _this = this;

        this.quill.on(type, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, [type].concat(args));
        });
      },
      handleInitialContent: function handleInitialContent() {
        if (this.value) this.quill.root.innerHTML = this.value; // Set initial editor content
      },
      handleSelectionChange: function handleSelectionChange(range, oldRange) {
        if (!range && oldRange) this.$emit("blur", this.quill);else if (range && !oldRange) this.$emit("focus", this.quill);
      },
      handleTextChange: function handleTextChange(delta, oldContents) {
        var editorContent = this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
        this.$emit("input", editorContent);
        if (this.useCustomImageHandler) this.handleImageRemoved(delta, oldContents);
      },
      handleImageRemoved: function handleImageRemoved(delta, oldContents) {
        var _this2 = this;

        var currrentContents = this.quill.getContents();
        var deletedContents = currrentContents.diff(oldContents);
        var operations = deletedContents.ops;
        operations.map(function (operation) {
          if (operation.insert && operation.insert.hasOwnProperty("image")) {
            var image = operation.insert.image;

            _this2.$emit("image-removed", image);

            _this2.$emit("imageRemoved", image);
          }
        });
      },
      checkForCustomImageHandler: function checkForCustomImageHandler() {
        // eslint-disable-next-line no-unused-expressions
        this.useCustomImageHandler === true ? this.setupCustomImageHandler() : "";
      },
      setupCustomImageHandler: function setupCustomImageHandler() {
        var toolbar = this.quill.getModule("toolbar");
        toolbar.addHandler("image", this.customImageHandler);
      },
      customImageHandler: function customImageHandler(image, callback) {
        this.$refs.fileInput.click();
      },
      emitImageInfo: function emitImageInfo($event) {
        var resetUploader = function resetUploader() {
          var uploader = document.getElementById("file-upload");
          uploader.value = "";
        };

        var file = $event.target.files[0];
        var Editor = this.quill;
        var range = Editor.getSelection();
        var cursorLocation = range.index;
        this.$emit("image-added", file, Editor, cursorLocation, resetUploader);
        this.$emit("imageAdded", file, Editor, cursorLocation, resetUploader);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"quillWrapper"},[_vm._t("toolbar"),_vm._v(" "),_c('div',{ref:"quillContainer",attrs:{"id":_vm.id}})],2)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var VueEditor = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  /* eslint-disable no-console */
  var Plugin = {
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      console.log("install -> options", options);
      Vue.component("VueEditor", VueEditor);
    }
  };

  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
