<template>
  <div class="demo">
    <h1>Plugin Demo</h1>
    <p>add: {{ a }} + {{ b }} = {{ $add(a, b) }}</p>
  </div>
</template>

<script>
export default {
  name: "Demo",
  data: () => ({ a: 1, b: 1 })
};
</script>

<style></style>
