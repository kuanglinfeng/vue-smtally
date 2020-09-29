<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default class extends Vue {

}
</script>

<style lang="scss">
@import "~@/styles/global.scss";
@import "~@/styles/variable.scss";

#app {
  min-height: $min-height;
}
</style>
