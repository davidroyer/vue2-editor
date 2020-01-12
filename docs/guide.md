# Guide

## Installation

### Using CDN

The plugin will automatically install itself as a Vue plugin.

<!-- https://unpkg.com/vue2-editor/dist/vue2-editor  -->

<!-- [unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue2-editor@{{ $version }}/dist/vue2-editor.js

Include vue2-editor after Vue and it will install itself automatically: -->

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-editor/dist/vue2-editor.umd.min.js"></script>
```

### NPM

```sh
npm install vue2-editor
```

### Yarn

```sh
yarn add vue2-editor
```

<br>

## Usage

There are two ways setup and use Vue2Editor. You can either set it up globally as a Vue plugin or import the `VueEditor` component to locally register and use it. Examples of both way are below.

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

<br>

## Modular Version <Badge text="2.9.0+"/>

As of version 2.9, you can use the modular version which includes only the JavaScript.
This allows for more control and customization. Also, this allows for other Quill themes to be used such as Bubble.

<<< @/docs/.vuepress/snippets/modular.vue

<!-- ## Nuxt

<iframe src="https://codesandbox.io/embed/nuxt-vue2editor-example-pcny9?fontsize=14" title="Nuxt & Vue2Editor Example" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe> -->
