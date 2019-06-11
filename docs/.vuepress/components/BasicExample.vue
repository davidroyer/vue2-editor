<template>
  <div class="example">
    <VueEditor v-model="content" use-markdown-shortcuts />
  </div>
</template>

<script>
let VueEditor;
if (typeof window !== "undefined") {
  console.log("GOT WINDOW");
  console.log("TCL: window", window);

  VueEditor = window.Vue2Editor.VueEditor;
}
// const VueEditor = window.Vue2Editor.VueEditor;
export default {
  components: { VueEditor },
  data() {
    return {
      content: "Starting Content"
    };
  }
};
</script>
