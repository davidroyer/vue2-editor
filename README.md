## Vue2-Editor

 ![Vue2Editor-Centered](https://www.dropbox.com/s/7com4d32zct44nc/Vue2Editor-Centered.png?raw=1)
HTML Editor using Vue.js 2.0 and Quilljs

[Vue.js](https://vuejs.org)

[Quill](http://quilljs.com/)

<!-- ## Demo -->

<!-- [fiddle](https://jsfiddle.net/su9zv0w9/1/) -->

## Install

```bash
$ npm install --save vue2-editor
```



## Use

```js
import VueEditor from 'vue2-editor'
```



## Props

Name | Type | Default | Description
---- | ---- | ------- | -----------
placeholder | String | - | Placeholder text for the editor
editor-content | String | null | Set the the content of the editor
use-save-button | Boolean | True | Set to false to use your own button to save editor content
button-text | String | Save Content | Set the button's text
editor-toolbar | Array | ** _Too long for table. See toolbar example below_  | Use a custom toolbar
show-preview | Boolean | False | Set to true to get live preview

## Events

Name             | Description
---------------- | -----------
editor-updated   | Emitted when the editor contents change
save-content     | Emitted when the default save button is clicked


## Example
**_editor-content_**
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
  import VueEditor from 'vue2-editor'

  export default {
    data: function () {
      return {
        htmlForEditor: null
      }
    },

    components: {
      VueEditor
    },

    methods: {
      setEditorContent: function () {
        this.htmlForEditor = '<h1>Html For Editor</h1>'
      }
    }
  }
</script>
```




## Example
**_show-preview_**

```html
<vue-editor
  :show-preview="true">
</vue-editor>
```




## Example
**_editor-toolbar_**

```html
<template>
  <div id="app">
    <vue-editor
      :editor-toolbar="customToolbar">
    </vue-editor>
  </div>
</template>

<script>
  import VueEditor from 'vue2-editor'

  export default {
    data: function () {
      return {
        customToolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['image', 'code-block']
          ]
      }
    },

    components: {
      VueEditor
    }
  }
</script>
```

## How do I get the html content from the text editor?

The property set in v-model will be automatically updated whenever a change happens.


## Example using several configuration options

```html
<template>
  <div id="app">
    <button type="button"
      @click="setEditorContent">
      Set Editor Content
    </button>

    <vue-editor
      v-model="htmlForEditor"
      :show-preview="true"
      @editor-updated="handleUpdatedContent"
      @save-content="handleSavingContent">
    </vue-editor>
  </div>
</template>

<script>
  import VueEditor from 'vue2-editor'

  export default {
    data: function () {
      return {
        htmlForEditor: null
      }
    },

    components: {
      VueEditor
    },

    methods: {
      handleSavingContent: function (value) {
        console.log(value)
      },

      handleUpdatedContent: function (value) {
        console.log(value);
      },

      setEditorContent: function () {
        this.htmlForEditor = '<h1>Html For Editor</h1>'
      }
    }
  }
</script>
```

# License

MIT
