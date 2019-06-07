# Installation

## Direct Download / CDN

https://unpkg.com/vue2-editor/dist/vue2-editor 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue2-editor@{{ $version }}/dist/vue2-editor.js
 
Include vue2-editor after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-editor/dist/vue2-editor.js"></script>
```

## NPM

```sh
$ npm install vue2-editor
```

## Yarn

```sh
$ yarn add vue2-editor
```

When used with a module system, you must explicitly install the `vue2-editor` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue2-editor from 'vue2-editor'

Vue.use(vue2-editor)
```

You don't need to do this when using global script tags.

