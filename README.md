# Vue2-Editor 2.0 (In Development)

![Vue2Editor-Centered](https://www.dropbox.com/s/7com4d32zct44nc/Vue2Editor-Centered.png?raw=1) HTML Editor using Vue.js 2.0 and Quilljs

[Vue.js](https://vuejs.org)

[Quill](http://quilljs.com/)

<!-- ## Demo --> <!-- [fiddle](https://jsfiddle.net/su9zv0w9/1/) -->

 # Install

```bash
$ npm install --save vue2-editor
```

# Use

```javascript
import { VueEditor } from 'vue2-editor'
```

# Props

Name           | Type   | Default                                            | Description
-------------- | ------ | -------------------------------------------------- | ----------------------------------------------------------------------
v-model        | String | -                                                  | Set v-model to the the content or data property you wish to bind it to
placeholder    | String | -                                                  | Placeholder text for the editor
editor-toolbar | Array  | ** _Too long for table. See toolbar example below_ | Use a custom toolbar

<!-- ## Events Name | Description ---------------- | ----------- editor-updated | Emitted when the editor contents change save-content | Emitted when the default save button is clicked -->

 # Example

**Basic Example**

```html
<template>
   <div id="app">
     <vue-editor v-model="content"></vue-editor>
   </div>
 </template>

 <script>
   import { VueEditor } from 'vue2-editor'

   components: {
     VueEditor
   },

   export default {
     data: function() {
       return {
         content: '<h1>Some initial content</h1>'  
       }
     }
   }
 </script>
```

# Example

**Set contents after page load**

```html
<template>
  <div id="app">
    <button type="button"
      @click="setEditorContent">
      Set Editor Contents
    </button>

    <vue-editor
      v-model="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  components: {
    VueEditor
  },

  export default {
    data: function() {
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

# Example

**_editor-toolbar_**

```html
<template>
  <div id="app">
    <vue-editor
      v-model="content"
      :editor-toolbar="customToolbar">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data: function () {
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

# How do I get the html content from the text editor?

_There are 2 different scenarios we need to address._

# Saving the content

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
      handleSavingContent: function () {
        // This is where you would save it to your database or send it via ajax
        console.log(this.content)
      }
    }  
  }
</script>
```

# Use a live preview

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
    data: function() {
      return {
        content: 'Initial Content'  
      }
    }
  }
</script>
```

# Install

```bash
yarn add vue2-editor
```

# Usage

```javascript
import Vue2Editor from 'vue2-editor'

//... your code
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
