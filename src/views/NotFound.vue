<template>
  <div class="wrapper">
    <Icon value="notFound" />
    <span>这个页面找不到哦！o(╥﹏╥)o</span>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue'

export default {
  name: 'NotFound',
  components: { Icon }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.wrapper {
  margin-top: 30px;
  text-align: center;
  color: $theme-color;
  font-size: 14px;
  display: flex;
  align-items: center;justify-content: center;
  flex-direction: column;
  ::v-deep > .icon {
    fill: $theme-color;
    margin-bottom: 20px;
    width: auto;
    height: auto;
  }
}
</style>