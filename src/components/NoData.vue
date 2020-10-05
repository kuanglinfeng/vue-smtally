<template>
  <div class="noData">
    <Icon value="noData" />
    <span>暂时还没有记录，快去记一笔吧~</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'

@Component({
  components: { Icon }
})
export default class extends Vue {

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.noData {
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  color: $theme-color;
  height: 100%;
  .icon {
    width: 50px;height: 50px;
    fill: $theme-color;
  }
}
</style>