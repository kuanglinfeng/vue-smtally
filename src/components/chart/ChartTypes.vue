<template>
  <div class="wrapper">
    <RadioMenu :values="values" @on-select="onSelect"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import RadioMenu from '@/components/RadioMenu.vue'

@Component({
  components: { RadioMenu }
})
export default class extends Vue {
  @Prop ({type: Array}) values!: string[]

  @Emit()
  onSelect(value: string) {
    return value
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.wrapper ::v-deep {
  display:flex;
  font-size: 14px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  > div {
    width: 40%;
    border: 1px solid $theme-color;
    background: #fff;
    > button {
      padding: 0;
      color: $theme-color;
      &.active {
        background: $theme-color;
        color: #fff;
      }
    }
  }
}
</style>