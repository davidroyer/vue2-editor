# Vue2Editor
View [Documenation](https://davidroyer.github.io/vue2-editor/#/) for Vue2Editor

![Vue2Editor-Centered](https://www.dropbox.com/s/7com4d32zct44nc/Vue2Editor-Centered.png?raw=1) HTML Editor using [Vue.js](https://vuejs.org) and [Quill](http://quilljs.com/)

<!-- ## Demo --> <!-- [fiddle](https://jsfiddle.net/su9zv0w9/1/) -->

# Install
_You can use Yarn or NPM_

```bash
$ npm install --save vue2-editor
```
**OR**
```bash
yarn add vue2-editor
```

# Usage

```javascript
// Basic Use - Covers most scenarios
import { VueEditor } from 'vue2-editor'

// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from 'vue2-editor'
```

# Props

Name           | Type   | Default                                            | Description
-------------- | ------ | -------------------------------------------------- | ----------------------------------------------------------------------
id | String | quill-container | Set the id (necessary if multiple editors in the same view)
v-model | String | - | Set v-model to the the content or data property you wish to bind it to
useCustomImageHandler | Boolean | false | Handle image uploading instead of using default conversion to Base64
placeholder    | String | -                                                  | Placeholder text for the editor
disabled | Boolean | false | Set to true to disable editor
customModules | Array  | - | Declare Quill modules to register | Use a custom toolbar
editorToolbar | Array  | ** _Too long for table. See toolbar example below_ | Use a custom toolbar
editorOptions | Array  | - | Offers object for merging into default config (add formats, custom Quill modules, ect)

# Events
Name           | Parameters   | Description
-------------- | ------------ | ----------------------------------------------------------------------
imageAdded   | file, Editor, cursorLocation |  Emitted when useCustomImageHandler is true and photo is being added to the editor
<!-- Emitted when the default save button is clicked -->

# Examples

## Example - Basic Setup

```html
<template>
   <div id="app">
     <vue-editor v-model="content"></vue-editor>
   </div>
 </template>

 <script>
   import { VueEditor } from 'vue2-editor'

   export default {

   components: {
      VueEditor
   },

   data() {
       return {
         content: '<h1>Some initial content</h1>'  
       }
     }
   }
 </script>
```

## Example - Custom Image Handler

If you choose to use the custom image handler, an event is emitted when a a photo is selected.
You can see below that 3 parameters are passed.
1. It passes the file to be handled however you need
2. The Editor instance
4. The cursor position at the time of upload so the image can be inserted at the correct position on success

**NOTE** In addition to this example, I have created a [ example repo](https://github.com/davidroyer/vue2editor-images) demonstrating this new feature with an actual server.

```html
<template>
  <div id="app">
    <vue-editor id="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded" v-model="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        htmlForEditor: ''  
      }
    },

    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file)

        axios({
          url: 'https://fakeapi.yoursite.com/images',
          method: 'POST',
          data: formData
        })
        .then((result) => {
          let url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>
```

## Example - Set Contents After Page Load

```html
<template>
  <div id="app">
    <button @click="setEditorContent">Set Editor Contents</button>
    <vue-editor v-model="htmlForEditor"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        htmlForEditor: null  
      }
    },

    methods: {
      setEditorContent: function() {
        this.htmlForEditor = '<h1>Html For Editor</h1>'
      }
    }
  }
</script>
```


## Example - Using Multiple Editors

```html
<template>
  <div id="app">
    <vue-editor id="editor1" v-model="editor1Content"></vue-editor>
    <vue-editor id="editor2" v-model="editor2Content"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        editor1Content: '<h1>Editor 1 Starting Content</h1>',
        editor2Content: '<h1>Editor 2 Starting Content</h1>',
      }
    }
  }
</script>

<style>
  #editor1, #editor2 {
    height: 350px;
  }
</style>
```


## Example - Custom Toolbar

```html
<template>
  <div id="app">
    <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        content: '<h1>Html For Editor</h1>',
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'code-block']
          ]
      }
    }
  }
</script>
```


## Example - Saving The Content
```html
<template>
  <div id="app">
    <button @click="saveContent"></button>
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data () {
      return {
        content: '<h3>Initial Content</h3>'
      }
    },

    methods: {
      handleSavingContent: function() {
        // You have the content to save
        console.log(this.content)
      }
    }  
  }
</script>
```

## Example - Use a Live Preview

```html
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


### Version 1 - ***Import and Register Yourself***

Vue2Editor now exports Quill to assist in this process.
1. When importing VueEditor, also import Quill.
2. Import your custom modules
3. Register the custom modules with Quill
4. Add the necessary configuration to the `editorOptions` object


```html
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
        content: '<h1>Initial Content</h1>'  
      }
    },
    editorSettings: {
      modules: {
        imageDrop: true,
        imageResize: {}
      }
    }
  }
</script>
```

### Version 2 - ***You Import | Vue2Editor Registers***
***(Recommended way)***

1. Import your custom modules
2. Use the `customModules` prop to declare an array of module(s).
3. Add the necessary configuration for those modules in the `editorOptions` object under modules as seen below

```html
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
  import { VueEditor } from 'vue2-editor'
  import { ImageDrop } from 'quill-image-drop-module'
  import ImageResize from 'quill-image-resize-module'

  export default {
    components: {
      VueEditor
    },    
    data() {
      return {
        content: '<h1>Initial Content</h1>'  
      }
    },
    customModulesForEditor: [
      { alias: 'imageDrop', module: ImageDrop },
      { alias: 'imageResize', module: ImageResize }
    ],
    editorSettings: {
      modules: {
        imageDrop: true,
        imageResize: {}
      }
    }
  }
</script>
```

---

# Development

Vue2Editor now uses [Poi](https://github.com/egoist/poi) for development

- `yarn dev`: Run example in development mode
- `yarn docs`: Development for Docs
- `yarn build`: Build component in both format
- `yarn lint`: Run eslint

<!-- # Achnoledgements
Markdown: https://github.com/patleeman/quill-markdown-shortcuts -->

# License

MIT

# Development

Vue2Editor now uses [Poi](https://github.com/egoist/poi) for development

- `yarn dev`: Run example in development mode
- `yarn docs`: Development for Docs
- `yarn build`: Build component in both format
- `yarn lint`: Run eslint

<!-- # Achnoledgements
Markdown: https://github.com/patleeman/quill-markdown-shortcuts -->

# License

MIT
