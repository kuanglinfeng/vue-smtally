<template>
  <div class="add-wrapper">
    <Header>
      <RadioMenu :values="['支出', '收入']" @on-select="onAmountTypeSelect" />
    </Header>
    <main>123</main>
    <Keyboard @amountChange="onAmountChange" @submit="onSubmit" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import Header from '@/components/bill/Header.vue'
import RadioMenu from '@/components/RadioMenu.vue'
import Keyboard from '@/components/bill/Keyboard.vue'

@Component({
  components: { Keyboard, RadioMenu, Layout, Header }
})
export default class extends Vue {

  amountType = '支出'
  amount = '0'

  onAmountTypeSelect(value: string) {
    console.log('amountType', value)
    this.amountType = value
  }

  onAmountChange(amount: string) {
    console.log('amount', amount)
    this.amount = amount
  }

  onSubmit(amount: number) {
    console.log('submit', amount)
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.add-wrapper {
  min-height: $min-height;
  display: flex;
  flex-direction: column;
  > main {
    flex-grow: 234;
  }
}
</style>