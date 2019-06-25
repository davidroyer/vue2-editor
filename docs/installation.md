# Installation

## Using CDN

The plugin will automatically install itself as a Vue plugin.

<!-- https://unpkg.com/vue2-editor/dist/vue2-editor  -->

<!-- [unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue2-editor@{{ $version }}/dist/vue2-editor.js
 
Include vue2-editor after Vue and it will install itself automatically: -->

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-editor/dist/vue2-editor.umd.min.js"></script>
```

## NPM

```sh
$ npm install vue2-editor
```

## Yarn

```sh
$ yarn add vue2-editor
```

<br>

::: tip IMPORTANT
When used with a module system, you must explicitly install Vue2Editor via `Vue.use()` as follows **IF** you want to use the plugin globally:
:::

```javascript
import Vue from 'vue'
import Vue2Editor from 'vue2-editor'

Vue.use(Vue2Editor)
```