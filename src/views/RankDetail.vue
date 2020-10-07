<template>
  <div class="rankDetail">
    <div class="header">
      <Icon value="back" @click="$router.back()" />
      <div class="title">{{ title }}</div>
      <div class="empty" />
    </div>
    <div class="recordList-wrapper">
      <RecordList
        :records-map="recordsMap"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import { filterRecordsByYearAndMonth } from '@/utils/recordsHandler'
import RecordList from '@/components/RecordList.vue'

@Component({
  components: { RecordList, Icon }
})
export default class extends Vue {

  title!: string
  value!: string
  amountType!: AmountType
  year!: number
  month!: number
  recordsMap = {}

  created() {
    const { title, value, amountType, year, month } = this.$route.query
    this.title = title as string
    this.value = value as string
    this.amountType = amountType as AmountType
    this.year = parseInt(year as string)
    this.month = parseInt(month as string)
    this.recordsMap = filterRecordsByYearAndMonth(this.$store.state.records, this.year, this.month, this.amountType, { title, value } as TagItem)
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.rankDetail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  div.title {
    display: flex;
    align-items: center;
  }
  div.header {
    padding: 8px 0;
    display: flex;
    justify-content: space-between;
    .icon {
      width: 30px; height: 30px;
      padding: 5px;
      fill: #fff;
    }
    background: $theme-color;
    color: #fff;
    font-size: 14px;
  }
  div.empty {
    width: 30px; height: 30px;
  }
  div.recordList-wrapper {
    flex-grow: 12;
    overflow: auto;
  }
}
</style>