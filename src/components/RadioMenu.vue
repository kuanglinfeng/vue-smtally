<template>
  <div class="wrapper">
    <button
      v-for="value in values"
      :key="value"
      :class="text === value ? 'active' : '' "
      @click="onSelect"
    >
      {{ value }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({type: String}) defaultValue!: string
  @Prop({type: Array}) values!: string[]

  text = ''

  created() {
    if (this.defaultValue) {
      this.text = this.defaultValue
    } else {
      this.text = this.values[0]
    }
  }

  @Emit()
  onSelect(e: ClickEvent) {
    this.text = e.target.innerText
    return e.target.innerText
  }
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