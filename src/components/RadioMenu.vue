<template>
  <div class="wrapper">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'

export default class RadioMenu extends Vue{
  // @Prop({type: String}) defaultValue!: string
  // @Prop({type: String}) values!: string[]
  // @Prop({type: String}) defaultValue!: string
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";
.wrapper {
  border: 1px solid #fff;
  width: 60%;
  border-radius: 4px;
  background: $theme-color;
  color: #fff;
  display:flex;
  > button {
    padding: 4px 0;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    &.active {
      color: $theme-color;
      background: #fff;
    }
  }
}
</style>