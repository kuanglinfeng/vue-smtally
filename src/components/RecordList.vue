<template>
  <ul
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
          <span>收入：{{ dayAmount(records, '+', 2020, getMonth(date), getDay(date)).toFixed(2) }}</span>
          <span>支出：{{ dayAmount(records, '-', 2020, getMonth(date), getDay(date)).toFixed(2) }}</span>
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
            <div
              class="iconWrapper"
              :style="{'--tagColor': tagColors[record.tag.value]}"
            >
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
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import dayjs from 'dayjs'
import weekHash from '@/constants/weekHash'
import { getDayAmount } from '@/utils/recordsHandler'
import Icon from '@/components/Icon.vue'
import tagColors from '@/constants/tagColors'

@Component({
  components: {Icon}
})
export default class extends Vue {

  @Prop({type: Object}) recordsMap!: {[key: string]: RecordItem[]}

  tagColors = tagColors

  @Emit()
  onRecordClick(id: string) {
    return id
  }

  getMonth(date: Date | string) {
    return dayjs(date).month() + 1
  }
  getDay(date: Date | string) {
    return dayjs(date).date()
  }
  getWeek(date: Date | string) {
    return weekHash[dayjs(date).day()]
  }

  dayAmount(records: RecordItem[], amountType: AmountType, year: number, month: number, day: number) {
    return getDayAmount(records, amountType, year, month, day)
  }
}
</script>

<style scoped lang="scss">
ul.dateList {
  height: 100%;
  overflow: auto;
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
    background-color: var(--tagColor);;
    .icon {
      width: 25px;  height: 25px;
      fill: #fff;
    }
  }
}
</style>