<template>
  <v-chart
    :options="getOptions()"
    theme="light"
    :style="{height: '200px', marginTop: '20px'}"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import NoData from '@/components/NoData.vue'
import { PieChartData } from '@/utils/recordsHandler'

@Component({
  components: { NoData, 'v-chart': ECharts }
})
export default class extends Vue {
  @Prop({ type: Number }) year!: number
  @Prop({ type: Number }) month!: number
  @Prop({ type: String }) type!: AmountType
  @Prop({type: Array}) pieChartData!: PieChartData

  getOptions() {
    return {
      series: [{
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: this.pieChartData,
        silent: true,
        label: {
          formatter: '{b}: {c}'
        }
      }]
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