# :books: Vue2Editor Notes

> Things To Remember And Add To Other Notes file

<br>

## For Nuxt & SSR

Possibly switch to this:

```js
let Quill;
if (!Vue.prototype.$isServer) Quill = require("quill");
```

## Modular Version

**JavaScript**

```js
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
```

**CSS**

```css
@import "~vue2-editor/dist/vue2-editor.css";
```

<br>

## Importing Quill's styles

```css
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";
```

**Both of these work**

```js
import "vue2-editor/dist/css/vue2-editor.css";
import "quill/dist/quill.snow.css";
```

```vue
<style src="quill/dist/quill.snow.css"></style>
<!-- OR -->
<style>
@import "~quill/dist/quill.snow.css";

body {
  background: lightgrey !important;
}
.quillWrapper {
  padding: 1em;
  background: white;
}

.ql-editor {
  min-height: 300px;
}
</style>
```

<br>

## Releases

If a version has been published within the past 72 hours it can be removed if needed.
As follows:

```bash
npm unpublish vue2-editor@version
```

<!-- NOTE: Add this to Vue2Editor Docs -->

All of Quill's functionality referenced in their docs is available by providing the `VueEditor` component a `ref` attribute and then accessing `quill` from that reference.

**For example:**

```vue
<template>
  <div>
    <button @click="getEditorText">Get Text</button>
    <VueEditor ref="vEditor" v-model="content" />
  </div>
</template>

<script>
export default {
  data: () => ({
    content: ""
  }),

  methods: {
    getEditorText() {
      console.log(this.$refs.vEditor.quill.getText());
    }
  }
};
</script>
```
