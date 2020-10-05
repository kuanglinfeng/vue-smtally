<template>
  <div class="header">
    <Icon value="back" @click="$router.back()" />
    <div class="yearAndMonth">
      {{ year }}年
      <SelectMonth
        :month="currentMonth"
        @confirm="onMonthChange"
        class="selectMonth"
      />
    </div>
    <div class="empty" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import dayjs from 'dayjs'
import SelectMonth from '@/components/SelectMonth.vue'

@Component({
  components: { SelectMonth, Icon }
})
export default class extends Vue {

  @Prop ({type: Number}) year!: number
  @Prop ({type: Number}) month!: number

  currentMonth = dayjs().month()

  created() {
    if (this.month) {
      this.currentMonth = this.month
    }
  }

  @Emit()
  onMonthChange(m: number) {
    this.currentMonth = m
    return m
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

div.header {
  padding: 8px 12px;
  display:flex;
  justify-content: space-between;
  .icon {
    width: 30px;  height: 30px;
    padding: 5px;
    fill: #fff;
  }
  background: $theme-color;
  color: #fff;
  font-size: 14px;
}
div.yearAndMonth ::v-deep {
  display:flex;
  align-items: center;
  .icon {
    width: 20px; height: 20px;
    padding: 3px;
  }
  .selectMonth {
    display:flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
    }
  }
}
div.empty {
  width: 30px;  height: 30px;
}
</style>