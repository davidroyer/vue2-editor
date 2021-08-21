# Vue2Editor

> An easy-to-use but yet powerful and customizable rich text editor powered by Quill.js and Vue.js

<p align="center">
  <a href="https://www.vue2editor.com/">
  <h2>View Docs</h2>
  </a>
</p>

![Vue2Editor-Centered](https://www.dropbox.com/s/7com4d32zct44nc/Vue2Editor-Centered.png?raw=1)

[📖 **Release Notes**](./CHANGELOG.md)

<!-- HTML Editor using [Vue.js](https://vuejs.org) and [Quill](http://quilljs.com/) -->

<!-- ## Demo -->

<!-- [fiddle](https://jsfiddle.net/su9zv0w9/1/) -->

## Install

_You can use Yarn or NPM_

```bash
npm install vue2-editor
```

**OR**

```bash
yarn add vue2-editor
```

## Usage

```javascript
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";

// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from "vue2-editor";
```

## Nuxt.js

Add `vue2-editor/nuxt` to modules section of `nuxt.config.js`

```javascript
{
  modules: ["vue2-editor/nuxt"];
}
```

To avoid seeing warnings from Vue about a mismatch in content, you'll need to
wrap the `VueEditor` component with the `client-only` component Nuxt provides as
shown here:

```html
<client-only>
  <VueEditor />
</client-only>
```

## Props

| Name                  | Type    | Default                                              | Description                                                                            |
| --------------------- | ------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| customModules         | Array   | -                                                    | Declare Quill modules to register                                                      | Use a custom toolbar |
| disabled              | Boolean | false                                                | Set to true to disable editor                                                          |
| editorOptions         | Object  | -                                                    | Offers object for merging into default config (add formats, custom Quill modules, ect) |
| editorToolbar         | Array   | \*\* _Too long for table. See toolbar example below_ | Use a custom toolbar                                                                   |
| id                    | String  | quill-container                                      | Set the id (necessary if multiple editors in the same view)                            |
| placeholder           | String  | -                                                    | Placeholder text for the editor                                                        |
| useCustomImageHandler | Boolean | false                                                | Handle image uploading instead of using default conversion to Base64                   |
| v-model               | String  | -                                                    | Set v-model to the the content or data property you wish to bind it to                 |

## Events

| Name             | Parameters                   | Description                                                                         |
| ---------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| blur             | quill                        | Emitted on `blur` event                                                             |
| focus            | quill                        | Emitted on `focus` event                                                            |
| image-added      | file, Editor, cursorLocation | Emitted when `useCustomImageHandler` is true and photo is being added to the editor |
| image-removed    | file, Editor, cursorLocation | Emitted when `useCustomImageHandler` is true and photo has been deleted             |
| selection-change | range, oldRange, source      | Emitted on Quill's `selection-change` event                                         |
| text-change      | delta, oldDelta, source      | Emitted on Quill's `text-change` event                                              |

## Examples

### Example - Basic Setup

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

### Example - Custom Image Handler

If you choose to use the custom image handler, an event is emitted when a a photo is selected.
You can see below that 3 parameters are passed.

1. It passes the file to be handled however you need
2. The Editor instance
3. The cursor position at the time of upload so the image can be inserted at the correct position on success

**NOTE** In addition to this example, I have created a [example repo](https://github.com/davidroyer/vue2editor-images) demonstrating this new feature with an actual server.

```vue
<template>
  <div id="app">
    <vue-editor
      id="editor"
      useCustomImageHandler
      @image-added="handleImageAdded"
      v-model="htmlForEditor"
    >
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
          const url = result.data.url; // Get url from response
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

### Example - Set Contents After Page Load

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

### Example - Using Multiple Editors

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

### Example - Custom Toolbar

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

### Example - Saving The Content

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

### Example - Use a Live Preview

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

### How To Use Custom Quill Modules

There are two ways of using custom modules with Vue2Editor. This is partly because there have been cases in which errors are thrown when importing and attempting to declare custom modules, and partly because I believe it actually separates the concerns nicely.

#### Version 1 - **_Import and Register Yourself_**

Vue2Editor now exports Quill to assist in this process.

1. When importing VueEditor, also import Quill.
2. Import your custom modules
3. Register the custom modules with Quill
4. Add the necessary configuration to the `editorOptions` object

```vue
<template>
  <div id="app">
    <vue-editor
      :editorOptions="editorSettings"
      v-model="content">
  </div>
</template>

<script>
  import { VueEditor, Quill } from 'vue2-editor'
  import { ImageDrop } from 'quill-image-drop-module'
  import ImageResize from 'quill-image-resize-module'

  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/imageResize', ImageResize)

  export default {
    components: {
      VueEditor
    },
    data() {
      return {
        content: '<h1>Initial Content</h1>',
        editorSettings: {
          modules: {
            imageDrop: true,
            imageResize: {}
          }
        }
      }
    }
  }
</script>
```

#### Version 2 - **_You Import | Vue2Editor Registers_**

**_(Recommended way)_**

1. Import your custom modules
2. Use the `customModules` prop to declare an array of module(s).
3. Add the necessary configuration for those modules in the `editorOptions` object under modules as seen below

```vue
<template>
  <div id="app">
    <vue-editor
      :customModules="customModulesForEditor"
      :editorOptions="editorSettings"
      v-model="content"
    >
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

---

## Development

Vue2Editor now uses [Poi](https://github.com/egoist/poi) for development

- `yarn dev`: Run example in development mode
- `yarn docs`: Development for Docs
- `yarn build`: Build component in both format
- `yarn lint`: Run eslint

<!-- # Achnoledgements
Markdown: https://github.com/patleeman/quill-markdown-shortcuts -->

## License

MIT
