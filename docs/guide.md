# Guide

## Usage

There are 2 ways to Vue2Editor. You can either set it up globally as a Vue plugin or import the `VueEditor` component to locally register and use it. Examples of both way are below.

### Globally

```js
import Vue from "vue";
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
```

### Local Import

<!-- <<< @/docs/.vuepress/code-examples/source/basic.vue -->

```js
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";

// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from "vue2-editor";
```

## Advanced Control

As of version 2.9, you can use the modarl version which includeds only the JavaScript.
This allows for more control and customization. Also, this allows for other Quill themes to be used such as Bubble.

## Modular Version

<<< @/docs/.vuepress/snippets/modular.vue
