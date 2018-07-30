<template>
  <div id="app">
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/basic">Basic Example</router-link>
        <router-link to="/modules">Adding Modules</router-link>
        <router-link to="/images">Images Example</router-link>
        <router-link to="/syntax-highlighting">Syntax Highlighting Example</router-link>
      </nav>
    <router-view/>
  </div>

</template>
<style>
/*.flexWrapper {
        display: flex;
  }
  .editorWrapper {
      flex-basis: 50%;
  }
  .quillWrapper {
    position: relative;
    z-index: 99999;
  }
  */

#preview {
  background: #f6f6f6;
  border-left: 3px solid gray;
  padding: 2em;
  margin-left: 1em;
}

@media (min-width: 601px) {
  #preview {
    width: 47%;
  }
}

.ql-disabled {
  opacity: 0.5;
  background: rgba(153, 153, 153, 0.2);
}
</style>
