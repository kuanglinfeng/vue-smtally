<template>
  <svg class="icon" :class="enhanceClass" @click="click">
    <use :xlink:href="'#'+value"></use>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../icons', true, /\.svg$/))
} catch (error) {
  console.log(error)
}

@Component
export default class Icon extends Vue {
  @Prop(String) value!: string
  @Prop(String) enhanceClass!: string

  click() {
    this.$emit('click')
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>