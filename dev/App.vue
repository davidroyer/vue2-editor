<template>
  <div>
    <h1>Vue2Editor</h1>
    <vue-editor v-model="content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
