<template>
<i class="fas fa-fw fa-2x fa-bold"></i>

<!-- <svg
    aria-hidden="true" data-fa-processed="" data-prefix="fas" :data-icon="icon[attributes][data-icon]" :class="icon.attributes.class" role="img" xmlns="http://www.w3.org/2000/svg" :viewBox="icon.attributes.viewBox" style="transform-origin: 0.5em 0.5em;">
    <g transform="translate(256 256)">
      <g transform="translate(0, 0)  scale(1.25, 1.25)  rotate(0 0 0)">
      </g>
    </g>
  </svg> -->
<!-- <svg><use :xlink:href="'static/icons/' + weight + '.svg#' + name"></use></svg> -->
</template>

<script>
// import fontawesome from '@fortawesome/fontawesome'

import {
  faBold,
  faItalic,
  faList,
  faListUl,
  faCode,
  faUnderline,
  faIndent,
  faOutdent,
  faFlag,
  faSquare,
} from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'icon',

  props: {
    name,
    weight: {
      default: 'solid'
    }
  },
  computed: {
    iconInfo() {
      return fontawesome.icon(faFlag).abstract[0]
    },
    attributes() {
      return this.iconInfo.attributes
    },
    iconClasses() {
      return this.attributes.class
    },
    iconVb() {
      return this.attributes.viewBox
    },
    iconDataP() {
      let attrs = this.attributes
      return attrs[data - icon]
    },
    // iconVb() {
    //   return this.iconInfo.attributes.viewBox
    // },
    // iconVb() {
    //   return this.iconInfo.attributes.viewBox
    // }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
