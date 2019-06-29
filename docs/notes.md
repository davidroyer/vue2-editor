# Notes

## Accessing Quill's Functionality

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
