<template>
  <div class="rank-wrapper">
    <div class="title">{{ amountType === '+' ? '收入' : '支出' }}排行榜</div>
    <ul class="rankList">
      <li
        class="rankItem"
        v-for="data in getRankData(this.year, this.month, this.amountType)"
        :key="data.tag.value"
      >
        <div class="iconContainer">
          <Icon :value="`${ data.tag.value }`" />
        </div>
        <div class="rankContent">
          <p>
            <span>{{ data.tag.title }}</span>
            <span>{{ data.count }}笔</span>
            <span>{{ (data.percentage * 100).toFixed(1) }}%</span>
            <span>{{ data.amount }}</span>
          </p>
          <div
            class="proportionBar"
            :style="{'--width': data.percentage * 100 + '%'}"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs'
import { getTotalAmountOfMonth } from '@/utils/recordsHandler'

type RankDataItem = {
  tag: TagItem;
  count: number;
  amount: number;
  percentage: number;
}

type RankData = {
  // key is tagValue
  [key: string]: RankDataItem;
}

@Component({
  components: { Icon }
})
export default class extends Vue {
  @Prop({type: String}) amountType!: AmountType
  @Prop({type: Number}) year!: number
  @Prop({type: Number}) month!: number

  getRankData(year: number, month: number, type: AmountType) {
    const data: RankData = {}
    const totalAmountOfMonth = getTotalAmountOfMonth(this.$store.state.records, year, month)
    let totalAmount = 0
    if (type === '+')
      totalAmount = totalAmountOfMonth.income
    else
      totalAmount = totalAmountOfMonth.outlay
    this.$store.state.records.forEach((record: RecordItem) => {
      const y = dayjs(record.date).year()
      const m = dayjs(record.date).month() + 1
      if (y === year && m === month && record.type === type) {
        const tagValue = record.tag.value
        if (!data[tagValue]) {
          data[tagValue] = { tag: record.tag, amount: record.amount, count: 1, percentage: record.amount / totalAmount }
        } else {
          const previousData = data[tagValue]
          data[tagValue] = {
            tag: record.tag,
            amount: previousData.amount + record.amount,
            count: previousData.count + 1,
            percentage: (previousData.amount + record.amount) / totalAmount
          }
        }
      }
    })
    return Object.values(data).sort((a, b) => b.amount - a.amount)
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.rank-wrapper {
  padding: 5px 0;
  flex-grow: 234;
  overflow: auto;
}
div.title {
  margin: 5px 0;
  padding: 0 8px;
  font-size: 12px;
  color: #757575;
}
ul.rankList {
  overflow: auto;
}
li.rankItem {
  padding: 8px;
  display:flex;
  &:active {
    background: #E0E0E0;
  }
}
div.iconContainer {
  display:flex;
  align-items: center;
  justify-content: center;
  background: #ECF0EF;
  border-radius: 50%;
  &.active {
    background: $theme-color;
    > .icon {
      fill: #fff;
    }
  }
  &.define {
    background: #ECF0EF;
    border: 1px dashed #AAAAA8;
    > .icon {
      fill: #747777;
    }
  }
  margin: 0;
  padding: 0;
  background: $theme-color;
  width: 30px; height: 30px;
  .icon {
    fill: #fff;
    width: 24px;  height: 24px;
  }
}
div.rankContent {
  flex-grow: 909;
  display:flex;
  margin: 4px;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12px;
  > p {
    color: #787878;
    > span {
      float: left;
      margin-left: 6px;
      &:last-child {
        float: right;
        color: #D47B81;
        margin-right: 6px;
      }
    }
  }
}
div.proportionBar {
  background: #E0E0E0;
  height: 4px;
  border-radius: 2px;
  position: relative;
  &:after {
    position: absolute;
    left: 0; top: 0;
    content: '';
    display: inline-block;
    height: 4px;
    border-radius: 2px;
    background: #D47B81;
    width: var(--width);
  }
}
</style>