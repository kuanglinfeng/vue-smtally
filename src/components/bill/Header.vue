<template>
  <header>

  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

export default class Header extends Vue {

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

header {
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $theme-color;
  font-size: 14px;
  .icon {
    width: 30px; height: 30px;
    fill: #fff;
    padding: 5px;
  }
  > span {
    display: inline-block;
    color: #fff;
    width: 30px;height: 30px;
  }
}
</style>