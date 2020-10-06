<template>
  <div class="amountTypes-wrapper">
    <div class="outlay">
      <div
        @click="onOutlaySelect"
        :class="`circle ${ amountType === '-' ? 'active' : '' }`"
      />
      <span>支出:{{ outlayAmount.toFixed(2) }}</span>
    </div>
    <div class="income">
      <div
        @click="onIncomeSelect"
        :class="`circle ${ amountType === '+' ? 'active' : '' }`"
      />
      <span>收入:{{ incomeAmount.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {

  @Prop({ type: Number }) outlayAmount!: number
  @Prop({ type: Number }) incomeAmount!: number

  amountType = '-'

  onOutlaySelect() {
    if (this.amountType === '-') return
    this.amountType = '-'
    this.$emit('onTypeSelect', this.amountType)
  }

  onIncomeSelect() {
    if (this.amountType === '+') return
    this.amountType = '+'
    this.$emit('onTypeSelect', this.amountType)
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.amountTypes-wrapper {
  padding: 10px;
  font-size: 12px;
  color: #6E6E6E;
  .circle {
    display: inline-block;
    width: 9px; height: 9px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid;
  }
  > div {
    margin: 0 10px;
    > span {
      margin-left: 10px;
    }
  }
}

div.outlay {
  display: inline-block;
  > .circle {
    border-color: red;
    &.active {
      background: #FF9EB4;
    }
  }
}

div.income {
  display: inline-block;
  > .circle {
    border-color: green;
    &.active {
      background: $theme-color;
    }
  }
}
</style>