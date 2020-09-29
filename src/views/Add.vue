<template>
  <div class="add-wrapper">
    <Header>
      <RadioMenu :values="['支出', '收入']" @on-select="onAmountTypeSelect" />
    </Header>
    <main>
    </main>
    <div class="amountShow">
      <DatePicker @on-confirm="onDateConfirm" />
      <Remark @on-remark-change="onRemarkChange" :default-remark="remark" />
      <span class="amount" >{{'￥' + amount}}</span>
    </div>
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
import DatePicker from '@/components/DatePicker.vue'
import dayjs from 'dayjs'
import Remark from '@/components/Remark.vue'

@Component({
  components: { Remark, DatePicker, Keyboard, RadioMenu, Layout, Header }
})
export default class extends Vue {

  amountType = '支出'
  amount = '0'
  date = dayjs().toDate()
  remark = ''

  onAmountTypeSelect(value: string) {
    console.log('amountType', value)
    this.amountType = value
  }

  onAmountChange(amount: string) {
    console.log('amount', amount)
    this.amount = amount
  }

  onDateConfirm(date: Date) {
    console.log('date', date)
    this.date = date
  }

  onRemarkChange(remark: string) {
    console.log('remark', remark)
    this.remark = remark
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

.amount {
  font-weight: 600;
  font-size: 20px;
  color: $theme-color;
  display: inline-block;
  float: right;
  height: 52px;
  padding: 14px 10px 15px 0;
}
</style>