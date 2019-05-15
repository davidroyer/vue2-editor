/*!
 * vue2-editor v2.7.0-alpha.5
 * (c) David Royer <droyer01@gmail.com>
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Quill$2 = _interopDefault(require('quill'));
var merge = _interopDefault(require('lodash/merge'));
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var BlockEmbed = Quill$2["import"]("blots/block/embed");

var HorizontalRule =
/*#__PURE__*/
function (_BlockEmbed) {
  _inherits(HorizontalRule, _BlockEmbed);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _possibleConstructorReturn(this, _getPrototypeOf(HorizontalRule).apply(this, arguments));
  }

  return HorizontalRule;
}(BlockEmbed);

HorizontalRule.blotName = "hr";
HorizontalRule.tagName = "hr";
Quill$2.register("formats/horizontal", HorizontalRule); // Quill.js Plugin - Markdown Shortcuts
// This is a module for the Quill.js WYSIWYG editor (https://quilljs.com/)
// which converts text entered as markdown to rich text.
//
// v0.0.5
//
// Author: Patrick Lee (me@patricklee.nyc)
//
// (c) Copyright 2017 Patrick Lee (me@patricklee.nyc).
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

var MarkdownShortcuts =
/*#__PURE__*/
function () {
  function MarkdownShortcuts(quill, options) {
    var _this = this;

    _classCallCheck(this, MarkdownShortcuts);

    this.quill = quill;
    this.options = options;
    this.ignoreTags = ["PRE"];
    this.matches = [{
      name: "header",
      pattern: /^(#){1,6}\s/g,
      action: function action(text, selection, pattern) {
        var match = pattern.exec(text);
        if (!match) { return; }
        var size = match[0].length; // Need to defer this action https://github.com/quilljs/quill/issues/1134

        setTimeout(function () {
          _this.quill.formatLine(selection.index, 0, "header", size - 1);

          _this.quill.deleteText(selection.index - size, size);
        }, 0);
      }
    }, {
      name: "blockquote",
      pattern: /^(>)\s/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, "blockquote", true);

          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: "code-block",
      pattern: /^`{3}(?:\s|\n)/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, "code-block", true);

          _this.quill.deleteText(selection.index - 4, 4);
        }, 0);
      }
    }, {
      name: "bolditalic",
      pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) { return; }
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            bold: true,
            italic: true
          });

          _this.quill.format("bold", false);
        }, 0);
      }
    }, {
      name: "bold",
      pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) { return; }
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            bold: true
          });

          _this.quill.format("bold", false);
        }, 0);
      }
    }, {
      name: "italic",
      pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) { return; }
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            italic: true
          });

          _this.quill.format("italic", false);
        }, 0);
      }
    }, {
      name: "strikethrough",
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) { return; }
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            strike: true
          });

          _this.quill.format("strike", false);
        }, 0);
      }
    }, {
      name: "code",
      pattern: /(?:`)(.+?)(?:`)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);
        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;
        if (text.match(/^([*_ \n]+)$/g)) { return; }
        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);

          _this.quill.insertText(startIndex, matchedText, {
            code: true
          });

          _this.quill.format("code", false);

          _this.quill.insertText(_this.quill.getSelection(), " ");
        }, 0);
      }
    }, {
      name: "hr",
      pattern: /^([-*]\s?){3}/g,
      action: function action(text, selection) {
        var startIndex = selection.index - text.length;
        setTimeout(function () {
          _this.quill.deleteText(startIndex, text.length);

          _this.quill.insertEmbed(startIndex + 1, "hr", true, Quill$2.sources.USER);

          _this.quill.insertText(startIndex + 2, "\n", Quill$2.sources.SILENT);

          _this.quill.setSelection(startIndex + 2, Quill$2.sources.SILENT);
        }, 0);
      }
    }, {
      name: "asterisk-ul",
      pattern: /^(\*|\+)\s$/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, "list", "unordered");

          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: "image",
      pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0]; // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]

        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;

        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);

            _this.quill.insertEmbed(start, "image", hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }, {
      name: "link",
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;

        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);

            _this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), "link", hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }]; // Handler that looks for insert deltas that match specific characters

    this.quill.on("text-change", function (delta, oldContents, source) {
      for (var i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty("insert")) {
          if (delta.ops[i].insert === " ") {
            _this.onSpace();
          } else if (delta.ops[i].insert === "\n") {
            _this.onEnter();
          }
        }
      }
    });
  }

  _createClass(MarkdownShortcuts, [{
    key: "isValid",
    value: function isValid(text, tagName) {
      return typeof text !== "undefined" && text && this.ignoreTags.indexOf(tagName) === -1;
    }
  }, {
    key: "onSpace",
    value: function onSpace() {
      var selection = this.quill.getSelection();
      if (!selection) { return; }

      var _this$quill$getLine = this.quill.getLine(selection.index),
          _this$quill$getLine2 = _slicedToArray(_this$quill$getLine, 2),
          line = _this$quill$getLine2[0],
          offset = _this$quill$getLine2[1];

      var text = line.domNode.textContent;
      var lineStart = selection.index - offset;

      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;
            var matchedText = text.match(match.pattern);

            if (matchedText) {
              // We need to replace only matched text not the whole line
              console.log("matched:", match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      var selection = this.quill.getSelection();
      if (!selection) { return; }

      var _this$quill$getLine3 = this.quill.getLine(selection.index),
          _this$quill$getLine4 = _slicedToArray(_this$quill$getLine3, 2),
          line = _this$quill$getLine4[0],
          offset = _this$quill$getLine4[1];

      var text = line.domNode.textContent + " ";
      var lineStart = selection.index - offset;
      selection.length = selection.index++;

      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var match = _step2.value;
            var matchedText = text.match(match.pattern);

            if (matchedText) {
              console.log("matched", match.name, text);
              match.action(text, selection, match.pattern, lineStart);
              return;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }]);

  return MarkdownShortcuts;
}(); // module.exports = MarkdownShortcuts;

//
var Quill = window.Quill || Quill$2;
var script = {
  name: "VueEditor",
  mixins: [oldApi],
  props: {
    id: {
      type: String,
      "default": "quill-container"
    },
    placeholder: {
      type: String,
      "default": ""
    },
    value: {
      type: String,
      "default": ""
    },
    disabled: {
      type: Boolean
    },
    editorToolbar: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    editorOptions: {
      type: Object,
      required: false,
      "default": function _default() {
        return {};
      }
    },
    useCustomImageHandler: {
      type: Boolean,
      "default": false
    },
    useMarkdownShortcuts: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      quill: null
    };
  },
  watch: {
    value: function value(val) {
      if (val != this.quill.root.innerHTML && !this.quill.hasFocus()) {
        this.quill.root.innerHTML = val;
      }
    },
    disabled: function disabled(status) {
      this.quill.enable(!status);
    }
  },
  mounted: function mounted() {
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
        modules["markdownShortcuts"] = {};
      }

      return modules;
    },
    prepareEditorConfig: function prepareEditorConfig(editorConfig) {
      if (Object.keys(this.editorOptions).length > 0 && this.editorOptions.constructor === Object) {
        if (this.editorOptions.modules && typeof this.editorOptions.modules.toolbar !== "undefined") {
          // We don't want to merge default toolbar with provided toolbar.
          delete editorConfig.modules.toolbar;
        }

        merge(editorConfig, this.editorOptions);
      }
    },
    registerPrototypes: function registerPrototypes() {
      Quill.prototype.getHTML = function () {
        return this.container.querySelector(".ql-editor").innerHTML;
      };

      Quill.prototype.getWordCount = function () {
        return this.container.querySelector(".ql-editor").innerText.length;
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
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments$1[_key];
        }

        _this.$emit.apply(_this, [type].concat(args));
      });
    },
    handleInitialContent: function handleInitialContent() {
      if (this.value) { this.quill.root.innerHTML = this.value; } // Set initial editor content
    },
    handleSelectionChange: function handleSelectionChange(range, oldRange) {
      if (!range && oldRange) { this.$emit("blur", this.quill); }else if (range && !oldRange) { this.$emit("focus", this.quill); }
    },
    handleTextChange: function handleTextChange() {
      var editorContent = this.quill.getHTML() === "<p><br></p>" ? "" : this.quill.getHTML();
      this.$emit("input", editorContent);
    },
    checkForCustomImageHandler: function checkForCustomImageHandler() {
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
      this.$emit("imageAdded", file, Editor, cursorLocation, resetUploader);
    }
  }
};

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "quillWrapper"
  }, [_vm._t("toolbar"), _vm._v(" "), _c('div', {
    ref: "quillContainer",
    attrs: {
      "id": _vm.id
    }
  }), _vm._v(" "), _vm.useCustomImageHandler ? _c('input', {
    ref: "fileInput",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "file-upload",
      "type": "file",
      "accept": "image/*"
    },
    on: {
      "change": function change($event) {
        return _vm.emitImageInfo($event);
      }
    }
  }) : _vm._e()], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var VueEditor = __vue_normalize__({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

// Import vue component
var Quill$1 = window.Quill || Quill$2; // Declare install function executed by Vue.use()

function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component("VueEditor", VueEditor);
} // Create module definition for Vue.use()

var Vue2Editor = {
  VueEditor: VueEditor,
  install: install
}; // Auto-install when vue is found (eg. in browser via <script> tag)

var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(Vue2Editor);
} // To allow use as module (npm/webpack/etc.) export component

exports.Quill = Quill$1;
exports.VueEditor = VueEditor;
exports.default = Vue2Editor;
exports.install = install;
