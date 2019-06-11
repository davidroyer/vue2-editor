---
# sidebar: auto
---

# Examples

## Basic Setup

```vue
<template>
   <div id="app">
     <vue-editor v-model="content"></vue-editor>
   </div>
 </template>

 <script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  }
};
</script>
```

## Custom Image Handler

If you choose to use the custom image handler, an event is emitted when a a photo is selected.
You can see below that 3 parameters are passed.

1. It passes the file to be handled however you need
2. The Editor instance
3. The cursor position at the time of upload so the image can be inserted at the correct position on success

**NOTE** In addition to this example, I have created a [ example repo](https://github.com/davidroyer/vue2editor-images) demonstrating this new feature with an actual server.

``` vue
<template>
  <div id="app">
    <vue-editor id="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded" v-model="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: ""
    };
  },

  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
```

## Set Contents After Page Load

```vue
<template>
  <div id="app">
    <button @click="setEditorContent">Set Editor Contents</button>
    <vue-editor v-model="htmlForEditor"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: null
    };
  },

  methods: {
    setEditorContent: function() {
      this.htmlForEditor = "<h1>Html For Editor</h1>";
    }
  }
};
</script>
```

## Using Multiple Editors

```vue
<template>
  <div id="app">
    <vue-editor id="editor1" v-model="editor1Content"></vue-editor>
    <vue-editor id="editor2" v-model="editor2Content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      editor1Content: "<h1>Editor 1 Starting Content</h1>",
      editor2Content: "<h1>Editor 2 Starting Content</h1>"
    };
  }
};
</script>

<style>
#editor1,
#editor2 {
  height: 350px;
}
</style>
```

## Custom Toolbar

```vue
<template>
  <div id="app">
    <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h1>Html For Editor</h1>",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  }
};
</script>
```

## Saving The Content

```vue
<template>
  <div id="app">
    <button @click="saveContent"></button>
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  data() {
    return {
      content: "<h3>Initial Content</h3>"
    };
  },

  methods: {
    handleSavingContent: function() {
      // You have the content to save
      console.log(this.content);
    }
  }
};
</script>
```

## Use a Live Preview

```vue
<template>
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
    <div v-html="content"></div>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  components: {
    VueEditor
  },

  export default {
    data() {
      return {
        content: '<h1>Initial Content</h1>'  
      }
    }
  }
</script>
```

## How To Use Custom Quill Modules

There are 2 ways of using custom modules with Vue2Editor. This is partly because there have been cases in which errors are thrown when importing and attempting to declare custom modules, and partly because I believe it actually separates the concerns nicely.

::: tip
_If you have errors when using custom modules,
try adding this to your webpack config_

```js
new webpack.ProvidePlugin({
	'window.Quill': 'quill/dist/quill.js',
	'Quill': 'quill/dist/quill.js',
}),
```

:::

### Version 1 - **_Import and Register Yourself_**

**_(Recommended way)_**

Vue2Editor now exports Quill to assist in this process.

1.  When importing VueEditor, also import Quill.
2.  Import your custom modules
3.  Register the custom modules with Quill
4.  Add the necessary configuration to the `editorOptions` object

```vue
<template>
  <div id="app">
    <vue-editor
      :editorOptions="editorSettings"
      v-model="content">
    </vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "<h1>Initial Content</h1>",
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    };
  }
};
</script>
```

### Version 2 - **_You Import | Vue2Editor Registers_**

1.  Import your custom modules
2.  Use the `customModules` prop to declare an array of module(s).
3.  Add the necessary configuration for those modules in the `editorOptions` object under modules as seen below

```vue
<template>
  <div id="app">
    <vue-editor
      :customModules="customModulesForEditor"
      :editorOptions="editorSettings"
      v-model="content">
    </vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "<h1>Initial Content</h1>",
      customModulesForEditor: [
        { alias: "imageDrop", module: ImageDrop },
        { alias: "imageResize", module: ImageResize }
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    };
  }
};
</script>
```

## Setting Focus on Editor Programmatically

Give the editor instance a `ref` property

```vue
<template>
  <button @click.prevent="focusEditor">Focus Editor</button>
  <vue-editor
    ref="editor"
    v-model="editor2Content">
  </vue-editor>
</template>

<script type="text/javascript">
export default {
  methods: {
    focusEditor() {
      this.$refs.editor.quill.focus();
    }
  }
};
</script>
```

## Listening For Events

```vue
<template>
  <vue-editor
    @focus="onEditorFocus"
    @blur="onEditorBlur"
    @selection-change="onSelectionChange"
    v-model="editor2Content">
  </vue-editor>
</template>

<script type="text/javascript">
export default {
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },

    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },

    onSelectionChange(range) {
      console.log("selection change!", range);
    }
  }
};
</script>
```
