<template>
  <div class="example clearfix">
    <VueEditor v-model="content" use-markdown-shortcuts />
  </div>
</template>

<script>
if (typeof process === undefined) {
  console.log("GOT WINDOW");
}
const VueEditor = Vue2Editor.VueEditor;
export default {
  components: { VueEditor },
  data() {
    return {
      content: "null"
    };
  }
};
</script>
