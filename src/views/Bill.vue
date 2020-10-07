<template>
  <Layout>
    <Header
      :year="year"
      :month="month"
      :income="monthIncome"
      :outlay="monthOutlay"
      @month-confirm="onMonthConfirm"
    />
    <div class="noData-wrapper" v-if="Object.values(recordsMap).length === 0">
      <NoData />
    </div>
    <RecordList
      v-else
      :records-map="recordsMap"
      @on-record-click="onRecordClick"
    />
    <van-action-sheet v-model="showAction" :actions="actions" @select="onActionSelect" />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import dayjs from 'dayjs'
import Header from '@/components/bill/Header.vue'
import Icon from '@/components/Icon.vue'
import NoData from '@/components/NoData.vue'
import { filterRecordsByYearAndMonth } from '@/utils/recordsHandler'
import RecordList from '@/components/RecordList.vue'

@Component({
  components: { RecordList, NoData, Icon, Header, Layout }
})
export default class Bill extends Vue {

  year = dayjs().year()
  month = dayjs().month() + 1
  monthIncome = 0
  monthOutlay = 0

  recordsMap = {}
  actions = [{ name: '编辑' }, { name: '删除' }, { name: '取消' }]
  showAction = false
  selectedRecordId = ''

  onActionSelect(action: { name: string }) {
    if (action.name === '删除') {
      this.$store.commit('removeRecord', this.selectedRecordId)
      this.recordsMap = filterRecordsByYearAndMonth(this.$store.state.records, this.year, this.month)
    } else if (action.name === '编辑') {
      this.$router.push(`/add?id=${ this.selectedRecordId }`)
    }
    this.showAction = false
  }

  onRecordClick(id: string) {
    this.showAction = true
    this.selectedRecordId = id
  }

  onMonthConfirm(month: string) {
    this.month = parseInt(month)
  }

  @Watch('month', { immediate: true })
  getTotalAmountOfMonth() {
    this.$store.commit('getAllRecords')
    this.monthOutlay = 0
    this.monthIncome = 0
    this.recordsMap = filterRecordsByYearAndMonth(this.$store.state.records, this.year, this.month)
    this.$store.state.records.forEach((record: RecordItem) => {
      const y = dayjs(record.date).year()
      const m = dayjs(record.date).month() + 1
      if (y === this.year && m === this.month && record.type === '+') {
        this.monthIncome += record.amount
      }
      if (y === this.year && m === this.month && record.type === '-') {
        this.monthOutlay += record.amount
      }
    })
  }

}
</script>

<style scoped lang="scss">
div.noData-wrapper {
  margin-top: 100px;
}
</style>