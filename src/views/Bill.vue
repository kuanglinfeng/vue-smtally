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
    <ul
      v-else
      class="dateList"
    >
      <li
        class="dateItem"
        v-for="(records, date) in recordsMap"
        :key="date"
      >
        <div class="title">
          <div class="dateSpan">
            {{ getMonth(date) }}月{{ getDay(date) }}日 周{{ getWeek(date) }}
          </div>
          <div class="totalAmount">
            <span>收入：{{ getDayAmount('+', 2020, getMonth(date), getDay(date)).toFixed(2) }}</span>
            <span>支出：{{ getDayAmount('-', 2020, getMonth(date), getDay(date)).toFixed(2) }}</span>
          </div>
        </div>
        <ul class="recordList">
          <li
            class="recordItem"
            v-for="record in records"
            :key="record.id"
            @click="onRecordClick(record.id)"
          >
            <div class="tag">
              <div class="iconWrapper">
                <Icon :value="record.tag.value" />
              </div>
              <div class="remarkWrapper">
                <span>{{ record.tag.title }}</span>
                <span class="remark">{{ record.remark }}</span>
              </div>
            </div>
            <div class="amount">
              {{ record.type === '-' ? '-' + record.amount.toFixed(2) : '+' + record.amount.toFixed(2) }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
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
import weekHash from '@/constants/weekHash'
import NoData from '@/components/NoData.vue'

@Component({
  components: { NoData, Icon, Header, Layout }
})
export default class Bill extends Vue {

  year = dayjs().year()
  month = dayjs().month() + 1
  monthIncome = 0
  monthOutlay = 0

  recordsMap = {}
  actions = [{name: '编辑'}, {name: '删除'}, {name: '取消'}]
  showAction = false
  selectedRecordId = ''

  onActionSelect(action: {name: string}) {
    if (action.name === '删除') {
      this.$store.commit('removeRecord', this.selectedRecordId)
      this.recordsMap = this.filterRecordsByYearAndMonth(this.year, this.month)
    } else if (action.name === '编辑') {
      this.$router.push(`/add?id=${ this.selectedRecordId }`)
    }
    this.showAction = false
  }

  onRecordClick(id: string) {
    this.showAction = true
    this.selectedRecordId = id
  }

  created() {
    this.$store.commit('getAllRecords')
  }

  getMonth(date: Date) {
    return dayjs(date).month() + 1
  }
  getDay(date: Date) {
    return dayjs(date).date()
  }
  getWeek(date: Date) {
    return weekHash[dayjs(date).day()]
  }

  getDayAmount(amountType: AmountType, year: number, month: number, day: number) {
    let total = 0
    this.$store.state.records.forEach((record: RecordItem) => {
      const y = dayjs(record.date).year()
      const m = dayjs(record.date).month() + 1
      const d = dayjs(record.date).date()
      if (y === year && m === month && d ===  day && record.type === amountType) {
        total += record.amount
      }
    })
    return total
  }

  onMonthConfirm(month: string) {
    this.month = parseInt(month)
  }

  @Watch('month', {immediate: true})
  getTotalAmountOfMonth() {
    this.monthOutlay = 0
    this.monthIncome = 0
    this.recordsMap = this.filterRecordsByYearAndMonth(this.year, this.month)
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

  mapRecordsByDate(amountType?: AmountType, tag?: TagItem) {
    this.$store.commit('getAllRecords')
    let records: RecordItem[] = this.$store.state.records
    records.sort((a: RecordItem, b: RecordItem) => {
      const aTime = new Date(a.date).getTime()
      const bTime = new Date(b.date).getTime()
      return bTime - aTime
    })
    const map: any = {}
    if (amountType && tag) {
      records = records.filter(record => record.type === amountType && record.tag.value === tag.value)
    }
    records.forEach(record => {
      const y = dayjs(record.date).year()
      const m = dayjs(record.date).month() + 1
      const d = dayjs(record.date).date()
      if (!map[`${ y }-${ m }-${ d }`]) {
        map[`${ y }-${ m }-${ d }`] = [record]
      } else {
        map[`${ y }-${ m }-${ d }`].push(record)
      }
    })
    return map
  }

  filterRecordsByYearAndMonth(year: number, month: number, amountType?: AmountType, tag?: TagItem): { [key: string]: RecordItem[] } {
    const dateMap = this.mapRecordsByDate(amountType, tag)
    const map: any = {}
    for (const prop in dateMap) {
      // eslint-disable-next-line no-prototype-builtins
      if (dateMap.hasOwnProperty(prop)) {
        const y = parseInt(prop.split('-')[0])
        const m = parseInt(prop.split('-')[1])
        if (year === y && month === m) {
          map[prop] = dateMap[prop]
        }
      }
    }
    return map
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";
ul.dateList {
  height: 100%;
  overflow: auto;
}
ul.recordList {
  padding: 0 20px;
  font-size: 14px;
}
li.recordItem {
  border-bottom: 1px solid #EDEDED;
  &:last-child {
    border:none;
  }
  overflow: hidden;
  padding: 10px 0;
  > .tag {
    float: left;
    display:flex;
    align-items: center;
    > div.remarkWrapper {
      margin-left: 10px;
      display:flex;
      flex-direction: column;
      color: #797979;
      > span {
        &.remark {
          font-size: 12px;
          color: #A7A7A7;
        }
      }
    }
  }
  > .amount {
    line-height: 34px;
    height: 34px;
    float: right;
    color: #E58580;
  }
}
div.title {
  padding: 6px 16px;
  color: #949494;
  overflow: hidden;
  background: #F7F9F8;
  font-size: 12px;
}
div.dateSpan {
  float: left;
}
div.totalAmount {
  float: right;
  > span {
    margin-left: 8px;
  }
}
div.iconWrapper {
  display:flex;
  align-items: center;
  justify-content: center;
  height: 35px; width: 35px;
  border-radius: 50%;
  background: $theme-color;
  .icon {
    width: 25px;  height: 25px;
    fill: #fff;
  }
}
div.noData-wrapper {
  margin-top: 100px;
}
</style>