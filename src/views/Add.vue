<template>
  <div class="add-wrapper">
    <Header>
      <Icon value="back" @click="$router.back()" />
      <RadioMenu :values="['支出', '收入']" @on-select="onAmountTypeSelect" />
      <span />
    </Header>
    <UserTags :type="amountType" @onSelect="onTagSelect" />
    <div class="amountShow">
      <DatePicker @on-confirm="onDateConfirm" />
      <Remark @on-remark-change="onRemarkChange" :default-remark="remark" />
      <span class="amount">{{ '￥' + amount }}</span>
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
import UserTags from '@/components/bill/UserTags.vue'
import Icon from '@/components/Icon.vue'
@Component({
  components: {Icon, UserTags, Remark, DatePicker, Keyboard, RadioMenu, Layout, Header }
})
export default class extends Vue {

  amountType: AmountType = '-'
  amount = '0'
  date = dayjs().toDate()
  remark = ''
  tag!: TagItem

  onAmountTypeSelect(value: string) {
    this.amountType = value === '支出' ? '-' : '+'
  }

  onAmountChange(amount: string) {
    this.amount = amount
  }

  onDateConfirm(date: Date) {
    this.date = date
  }

  onRemarkChange(remark: string) {
    this.remark = remark
  }

  onTagSelect(tag: TagItem) {
    this.tag = tag
  }

  onSubmit(amount: number) {
    const id = this.$route.query.id
    const record: RecordItem = {
      type: this.amountType,
      tag: this.tag,
      date: this.date,
      remark: this.remark,
      amount: amount
    }
    if (!id) {
      this.$store.commit('addRecord', record)
    } else {
      this.$store.commit('editRecord', {
        id,
        record,
      })
    }
    this.$router.push('/bill')
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.add-wrapper {
  height: $min-height;
  display: flex;
  flex-direction: column;
  overflow: auto;
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