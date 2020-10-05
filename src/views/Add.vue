<template>
  <div class="add-wrapper">
    <Header>
      <Icon value="back" @click="$router.back()" />
      <RadioMenu
        :default-value="defaultRecord && (defaultRecord.type === '-' ? '支出' : '收入')"
        :values="['支出', '收入']"
        @on-select="onAmountTypeSelect"
      />
      <span />
    </Header>
    <UserTags
      :default-tag="defaultRecord && defaultRecord.tag"
      :type="amountType"
      @onSelect="onTagSelect"
    />
    <div class="amountShow">
      <DatePicker
        :default-date=" defaultRecord && translateStrToDate(defaultRecord.date)"
        @confirm="onDateConfirm"
      />
      <Remark
        :default-remark=" defaultRecord && defaultRecord.remark"
        @on-remark-change="onRemarkChange"
      />
      <span class="amount">{{'￥' + amount }}</span>
    </div>
    <Keyboard
      :default-amount="defaultRecord && defaultRecord.amount.toString()"
      @amountChange="onAmountChange"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import Header from '@/components/add/Header.vue'
import RadioMenu from '@/components/RadioMenu.vue'
import Keyboard from '@/components/add/Keyboard.vue'
import DatePicker from '@/components/DatePicker.vue'
import dayjs from 'dayjs'
import Remark from '@/components/Remark.vue'
import UserTags from '@/components/add/UserTags.vue'
import Icon from '@/components/Icon.vue'

@Component({
  components: { Icon, UserTags, DatePicker, Remark, Keyboard, RadioMenu, Layout, Header }
})
export default class extends Vue {

  amountType: AmountType = '-'
  amount = '0'
  date = dayjs().toDate()
  remark = ''
  tag!: TagItem

  defaultRecord = null

  created() {
    const id = this.$route.query.id
    if (id) {
      this.$store.commit('getRecordById', id)
      this.defaultRecord = this.$store.state.record
      this.amountType = this.$store.state.record.type
    }
  }

  translateStrToDate(str: string | Date) {
    if (str instanceof  Date) return str
    return dayjs(str).toDate()
  }

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