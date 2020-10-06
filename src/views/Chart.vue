<template>
  <Layout>
    <div class="chart-wrapper">
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
      <div class="no-data" v-if="pieChartData.length === 0 || lineChartData.yData.length === 0">
        <NoData />
      </div>
      <div v-else>
        <div
          v-if="chartType === '流水'"
        >
          <LineChart
            :year="year"
            :month="month"
            :type="amountType"
            :line-chart-data="lineChartData"
          />
          <span class="average">
          {{ amountType === '-' ? '支出' : '收入'}} ：{{ getAverageAmountOfMonth(this.year, this.month, this.amountType) }}
        </span>
        </div>
        <div v-else>
          <PieChart
            :year="year"
            :month="month"
            :type="amountType"
            :pie-chart-data="pieChartData"
          />
        </div>
        <div class="divide" />
        <Rank
          :year="year"
          :month="month"
          :amount-type="amountType"
        />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Layout from '@/components/Layout.vue'
import { Component, Watch } from 'vue-property-decorator'
import Header from '@/components/chart/Header.vue'
import dayjs from 'dayjs'
import ChartTypes from '@/components/chart/ChartTypes.vue'
import AmountTypes from '@/components/chart/AmountTypes.vue'
import LineChart from '@/components/chart/LineChart.vue'
import PieChart from '@/components/chart/PieChart.vue'
import Rank from '@/components/chart/Rank.vue'
import NoData from '@/components/NoData.vue'
import {
  getAverageAmountOfMonth,
  getLineChartData,
  getPieChartData,
  LineChartData,
  PieChartData
} from '@/utils/recordsHandler'

@Component({
  components: { NoData, Rank, PieChart, LineChart, AmountTypes, ChartTypes, Header, Layout }
})
export default class extends Vue {

  year = dayjs().year()
  month = dayjs().month() + 1
  chartType = '流水'
  amountType: AmountType = '-'

  pieChartData!: PieChartData
  lineChartData!: LineChartData

  @Watch('month', {immediate: true} )
  @Watch('amountType', {immediate: true})
  onChange() {
    this.$store.commit('getAllRecords')
    this.pieChartData = getPieChartData(this.$store.state.records, this.year, this.month, this.amountType)
    this.lineChartData = getLineChartData(this.$store.state.records, this.year, this.month, this.amountType)
  }

  onMonthChange(m: number) {
    this.month = m
  }

  onChartTypeSelect(value: string) {
    this.chartType = value
  }

  onAmountTypeSelect(type: AmountType) {
    this.amountType = type
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

  getAverageAmountOfMonth(year: number, month: number, type: AmountType) {
    return getAverageAmountOfMonth(this.$store.state.records, year, month, type)
  }
}
</script>

<style scoped lang="scss">

.chart-wrapper {
  display:flex;
  flex-direction: column;
}
span.average {
  color: #B9B9B9;
  font-size: 12px;
  padding: 10px 15px;
  display: inline-block;
}
div.divide {
  background: #EFEFEF;
  padding: 4px;
}
div.no-data {
  margin-top: 100px;
}
</style>