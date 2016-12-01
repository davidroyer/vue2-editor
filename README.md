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
import { VueEditor } from 'vue2-editor'
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
      :editor-content="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

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
  import { VueEditor } from 'vue2-editor'

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




## Example
**_use-save-button_**
```html
<vue-editor
  :use-save-button="false">
</vue-editor>
```



## Example
**_button-text_**

```html
<vue-editor
  button-text="Custom Save Message">
</vue-editor>
```



## How do I get the html content from the text editor?

_There are 2 different scenarios we need to address._



### 1. Using the default Save Button

When the button is clicked, the '**_save-content_**' event is emitted with the current contents of the editor.

You need to create a method that runs when this event is emitted and pass a parameter to this method. This parameter holds the editor contents.

**Note:** The default save button has a class of _save-button_ which you can target for styling the button.

```html
<template>
  <div id="app">
    <h1>Write Your Message and save it!</h1>
    <vue-editor
      @save-content="handleSavingContent">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    methods: {
      handleSavingContent: function (contentsToBeSaved) {
        console.log(contentsToBeSaved)
      }
    }  
  }
</script>
<style>
  .save-button {
    color: #fff;
    padding: .5em 1em;
    background-color: rgba(53, 73, 94, 0.85);
    text-decoration: none;
    border-radius: 2px;
    cursor: pointer;
    font-weight: 900;
    transition: background-color .2s ease;
    margin: 1em 0;
    float: right;
  }

  .save-button:hover {
      background-color: #35495e;
  }
</style>
```



### 2. Using your own button

The event '**_editor-updated_**' is emitted when the text inside the editor changes. The current editor contents are sent with this event.

You need to create a method that runs when this event is emitted.

EX:

```html
<template>
  <div id="app">

    <vue-editor
      :use-save-button="false"
      @editor-updated=handleUpdatedContent>
    </vue-editor>

    <button type="button" name="save-content"
      @click="saveTheContent">
      Our Own Button
    </button>

  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    data: function () {
      return {
        htmlFromEditor: null
      }
    },

    components: {
      VueEditor
    },

    methods: {
      handleUpdatedContent: function (value) {
        this.htmlFromEditor = value
      },

      saveTheContent: function () {
        // Do whatever you want
        console.log(this.htmlFromEditor)
      }
    }
  }
</script>
```



## Example using several configuration options

```html
<template>
  <div id="app">
    <button type="button"
      @click="setEditorContent">
      Set Editor Content
    </button>

    <vue-editor
      :editor-content="htmlForEditor"
      :show-preview="true"
      @editor-updated="handleUpdatedContent"
      @save-content="handleSavingContent"
      button-text="Save Your Content">
    </vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

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
