# Vue2-Editor

![Vue2Editor-Centered](https://www.dropbox.com/s/7com4d32zct44nc/Vue2Editor-Centered.png?raw=1) HTML Editor using Vue.js and Quilljs

[Vue.js](https://vuejs.org)

[Quill](http://quilljs.com/)

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
import { VueEditor } from 'vue2-editor'

//... your code
```

# Props

Name           | Type   | Default                                            | Description
-------------- | ------ | -------------------------------------------------- | ----------------------------------------------------------------------
id | String | quill-container | Set the id (necessary if multiple editors in the same view)
v-model | String | - | Set v-model to the the content or data property you wish to bind it to
useCustomImageHandler | Boolean | false | Handle image uploading instead of using default conversion to Base64
placeholder    | String | -                                                  | Placeholder text for the editor
disabled | Boolean | false | Set to true to disable editor
editorToolbar | Array  | ** _Too long for table. See toolbar example below_ | Use a custom toolbar

# Events
Name           | Parameters   | Description
-------------- | ------------ | ----------------------------------------------------------------------
imageAdded   | file, Editor, cursorLocation |  Emitted when useCustomImageHandler is true and photo is being added to the editor
<!-- Emitted when the default save button is clicked -->

## Example
**_Basic Setup_**

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

## Example

**_Upload image to server and use returned url instead of data URL_**

If you choose to use the custom image handler, an event is emitted when a a photo is selected.
You can see below that 3 parameters are passed.
1. It passes the file to be handled however you need
2. The Editor instance
4. The cursor position at the time of upload so the image can be inserted at the correct position on success

**NOTE** In addition to this example, I have created a [new example repo](https://github.com/davidroyer/vue2editor-images) demonstrating this new feature with an actual server.

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
      handleImageAdded: function(file, Editor, cursorLocation) {
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
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }
  }
</script>
```

## Example

**_Set Contents After Page Load_**

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

## Example

**_Using Multiple Editors_**

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


## Example
**_Custom Toolbar_**

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


### Example
**_Saving the Content_**
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

## Example
**_Use a Live Preview_**

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


# Folder structure

- `src/`: Source files for this component

  - `Vue2Editor.vue` The component itself

- `example/`: Example for demonstrating this component

  - `index.js`: Entry for the example
  - `App.vue`: The root component which we use to load this component

- `vbuild.example.js`: Config file for your example
- `vbuild.component.js`: Config file for your component
- `package.json`: App manifest
- `.editorconfig`: Ensure consistent editor behaivor
- `.gitignore`: Ignore files we don't need to push

# Development

- `yarn example`: Run example in development mode
- `yarn deploy`: Deploy example to gh-pages
- `yarn build:cjs`: Build component in commonjs format
- `yarn build:umd`: Build component in umd format
- `yarn build`: Build component in both format
- `yarn lint`: Run eslint

Check out your npm scripts, it's using [vbuild](https://github.com/egoist/vbuild) under the hood.

# License

MIT
