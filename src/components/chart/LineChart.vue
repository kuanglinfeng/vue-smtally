<template>
  <v-chart
    :options="getOptions()"
    theme="light"
    :style="{height: '150px', marginTop: '20px'}"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { LineChartData } from '@/utils/recordsHandler'

@Component({
  components: { 'v-chart': ECharts }
})
export default class extends Vue {
  @Prop({ type: Number }) year!: number
  @Prop({ type: Number }) month!: number
  @Prop({ type: String }) type!: AmountType
  @Prop({ type: Object }) lineChartData!: LineChartData


  getOptions() {
    return {
      grid: {
        top: '5%',
        bottom: '10%'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter: '{b0}日 {c0}',
        axisPointer: {
          lineStyle: {
            color: '#E48076',
            width: '1',
          },
        },
        position(point: any) {
          return [point[0], '-10%']
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textStyle: {
          color: '#E48076',
          fontSize: '12'
        }
      },
      xAxis: {
        data: this.lineChartData.xData,
        axisTick: {
          interval: 0,
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: {
          interval: 0,
          fontSize: 8,
          color: '#999999'
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            opacity: 0
          }
        },
        splitLine: {
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: undefined,
        axisTick: undefined,
      },
      series: [
        {
          type: 'line',
          data: this.lineChartData.yData
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>