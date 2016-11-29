## Vue2-Editor

HTML Editor using Vue.js 2.0 and Quilljs
<br>
[Vue.js](https://vuejs.org)
</br>
[Quill](http://quilljs.com/)

<!-- ## Demo -->

<!-- [fiddle](https://jsfiddle.net/su9zv0w9/1/) -->

## Install

```bash
$ npm install --save vue2-editor
```
</br>

## Use
```js
import { VueEditor } from 'vue2-editor'
```
</br>

## Props

**_editor-content_**:
<br>
You can set the the content of the editor dynamically. If you don't need this feature then do not include it.


**_show-preview_**:
<br>
This is set to FALSE by default. To enable,
```html
<vue-editor
  :show-preview="true">
</vue-editor>
```

**_editor-toolbar_**:
<br>
If you want to use a custom toolbar then you can set it to a property from the data object
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
  }
}
</script>
```

**_use-save-button_**:
Default is TRUE.


**_button-text_**:
Default is 'Save Content'. If you want to use the built in Save button but want it to have different text then you can set this prop a String
```html
<vue-editor
  button-text="Custom Save Message">
</vue-editor>
```
</br>


## Events

**_editor-updated_**:

**_save-content_**:

</br>

### Example using all configuration options
EX:
```html
<template>
  <div id="app">
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
  methods: {
    handleSavingContent: function (value) {
      console.log(value)
    }
  }  
}
</script>
```

## How do I get the html content from the text editor?
_There are 2 different scenarios we need to address._
</br></br>

### 1. Using the default Save Button

   When the button is clicked, an event called '**_save-content_**' is emitted with the value of the text editor.

   You can listen for this event then execute a method that you create when the '**_save-content_**'' method fires.

   Note: You will need to pass a parameter to the method you create. This parameter holds the value of editor contents.

EX:
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
  methods: {
    handleSavingContent: function (contentsToBeSaved) {
      console.log(contentsToBeSaved)
    }
  }  
}
</script>
```
<br>
### Using your own button

The event '**_editor-updated_**' is emitted whenever the text inside the text editor changes. The current editor contents are sent as a value with this event.

This means we can listen for the '**_editor-updated_**' event, get the value of the editor from it, and set it to a data reference in our current instance.

Then, we can use THAT data reference from our own instance however we please.

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

# License
MIT
