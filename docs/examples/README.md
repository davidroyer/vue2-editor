---
# sidebar: auto
---

# Examples

## Basic Setup

<<< @/docs/.vuepress/code-examples/source/basic.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Custom Image Handler

If you choose to use the custom image handler, an event is emitted when a a photo is selected.
You can see below that 3 parameters are passed.

1. It passes the file to be handled however you need
2. The Editor instance
3. The cursor position at the time of upload so the image can be inserted at the correct position on success

**NOTE** In addition to this example, I have created a [example repo](https://github.com/davidroyer/vue2editor-images) demonstrating this new feature with an actual server.

```vue
<template>
  <div id="app">
    <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
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

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Set Contents After Page Load

<<< @/docs/.vuepress/code-examples/source/set-contents.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Using Multiple Editors

<!-- <<< @/docs/.vuepress/code-examples/source/multiple-editors.vue -->

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

<<< @/docs/.vuepress/code-examples/source/custom-toolbar.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Saving The Content

<<< @/docs/.vuepress/code-examples/source/custom-toolbar.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Use a Live Preview

<<< @/docs/.vuepress/code-examples/source/live-preview.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## How To Use Custom Quill Modules

There are two ways of using custom modules with Vue2Editor. This is partly because there have been cases in which errors are thrown when importing and attempting to declare custom modules, and partly because I believe it actually separates the concerns nicely.

::: tip TIP
_If you have errors when using custom modules,
try adding this to your webpack config_

```js
new webpack.ProvidePlugin({
  "window.Quill": "quill/dist/quill.js",
  Quill: "quill/dist/quill.js"
});
```

:::

### Version 1 - **_Import and Register Yourself_**

**_(Recommended way)_**

Vue2Editor now exports Quill to assist in this process.

1. When importing VueEditor, also import Quill.
2. Import your custom modules
3. Register the custom modules with Quill
4. Add the necessary configuration to the `editorOptions` object

```vue
<template>
  <div id="app">
    <vue-editor :editorOptions="editorSettings" v-model="content"> </vue-editor>
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

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

### Version 2 - **_You Import | Vue2Editor Registers_**

1. Import your custom modules
2. Use the `customModules` prop to declare an array of module(s).
3. Add the necessary configuration for those modules in the `editorOptions` object under modules as seen below

```vue
<template>
  <div id="app">
    <vue-editor :customModules="customModulesForEditor" :editorOptions="editorSettings" v-model="content"> </vue-editor>
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

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Setting Focus on Editor Programmatically

Give the editor instance a `ref` property

<<< @/docs/.vuepress/code-examples/source/set-focus.vue

<hr class="spacer" style="margin: 1em 0 1.75em !important; opacity: 0;"/>

## Listening For Events

<<< @/docs/.vuepress/code-examples/source/event-listening.vue
