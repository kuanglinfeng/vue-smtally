<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DatetimePicker, Popup, Picker, ActionSheet } from 'vant'

Vue.use(DatetimePicker).use(Popup).use(Picker).use(ActionSheet)

export default {}
</script>

<style lang="scss">
@import "~@/styles/global.scss";
@import "~@/styles/variable.scss";

#app {
  min-height: $min-height;
}
</style>
