<template>
  <Layout>
    <Header :year="year" :month="month" @on-month-change="onMonthChange" />
    <ChartTypes
      :values="['流水', '分类']"
      @on-select="onChartTypeSelect"
    />
    <AmountTypes
      :income-amount="getTotalAmountOfMonth(year, month).income"
      :outlay-amount="getTotalAmountOfMonth(year, month).outlay"
      @onTypeSelect="onAmountTypeSelect"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from '@/components/Layout.vue'
import { Component } from 'vue-property-decorator'
import Header from '@/components/chart/Header.vue'
import dayjs from 'dayjs'
import ChartTypes from '@/components/chart/ChartTypes.vue'
import AmountTypes from '@/components/chart/AmountTypes.vue'

@Component({
  components: { AmountTypes, ChartTypes, Header, Layout }
})
export default class extends Vue {

  year = dayjs().year()
  month = dayjs().month() + 1

  onMonthChange(m: number) {
    console.log(m)
  }

  onChartTypeSelect(value: string) {
    console.log(value)
  }

  onAmountTypeSelect(type: AmountType) {
    console.log(type)
  }

  getTotalAmountOfMonth(year: number, month: number) {
    let income = 0
    let outlay = 0
    this.$store.state.records.forEach((record: RecordItem) => {
      const y = dayjs(record.date).year()
      const m = dayjs(record.date).month() + 1
      if (y === year && m === month && record.type === '+') {
        income += record.amount
      }
      if (y === year && m === month && record.type === '-') {
        outlay += record.amount
      }
    })
    return { outlay, income }
  }
}
</script>

<style scoped lang="scss">

</style>