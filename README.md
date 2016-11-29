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


## Usage

### Example using all configuration options
EX:
```html
<template>
  <div id="app">
    <quill
      :editor-content="htmlForEditor"
      :show-preview="true"
      @editor-updated="handleUpdatedContent"
      @save-content="handleSavingContent"
      button-text="Save Your Content">
    </quill>
  </div>
</template>

<script type="text/javascript">
export default {
  methods: {
    handleSavingContent: function (value) {
      console.log(value)
    }
  }  
}
</script>
```

### How do I get the html content from the text editor?

_There are 2 different scenarios we need to address._
</br></br>

#### 1. Using the default Save Button
When the button is clicked, an event called '**_save-content_**' is emitted with the value of the text editor.

You can listen for this event then execute whichever method you would like when the '**_save-content_**'' method fires. You will retrieve the text contents from the emitted event by passing a parameter to your own function.

EX:
```html
<template>
  <div id="app">
    <h1>Write Your Message and save it!</h1>
    <quill
      @save-content="handleSavingContent">
    </quill>
  </div>
</template>

<script type="text/javascript">
export default {
  methods: {
    handleSavingContent: function (value) {
      console.log(value)
    }
  }  
}
</script>
```
<br>
#### Using your own button

The event '**_editor-updated_**' is emitted whenever the text inside the text editor changes. The current editor contents are sent as a value with this event.

This means we can listen for the '**_editor-updated_**' event, get the value of the editor from it, and set it to a data reference in our current instance.

Then, we can use THAT data reference from our own instance however we please.

EX:
```html
<template>
  <div id="app">

    <quill
      @editor-updated=handleUpdatedContent>
    </quill>

    <button type="button" name="save-content"
      @click="saveTheContent">
      Our Own Button
    </button>

  </div>
</template>

<script type="text/javascript">
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
