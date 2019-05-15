<template>
  <div id="app">
    <h2>Dashboard</h2>
    <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/basic">Basic Example</router-link>
      <router-link to="/customized">Customized</router-link>
      <router-link to="/custom-toolbar">Custom Toolbar</router-link>
    </nav>
    <router-view />
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
