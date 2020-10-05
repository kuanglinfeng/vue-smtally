<template>
  <div class="billHeader-wrapper">
    <div class="date">
      <span>{{ year }}年</span>
      <SelectMonth @confirm="monthConfirm" :month="month" />
    </div>
    <div class="total">
      <div>
        <span>收入</span>
        <div>{{ income.toFixed(2) }}</div>
      </div>
      <div>
        <span>支出</span>
        <div>{{ outlay.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import SelectMonth from '@/components/SelectMonth.vue'

@Component({
  components: { SelectMonth }
})
export default class extends Vue {

  @Prop({type: Number}) income!: number
  @Prop({type: Number}) outlay!: number
  @Prop({type: Number}) year!: number
  @Prop({type: Number}) month!: number

  @Emit()
  monthConfirm(month: string) {
    return month
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";
div.billHeader-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $theme-color;
  > span {
    display: inline-block;
    color: #fff;
    width: 30px;height: 30px;
  }
  padding-top: 20px;
  color: #fff;
  font-size: 12px;
  .icon {
    width: 16px;  height: 16px;
    margin-bottom: -2px;
    fill: #fff;
    padding: 5px;
  }
}
div.date ::v-deep {
  padding: 0 18px;
  width: 35%;
  border-right: 1px dashed #fff;
  display: flex;
  flex-direction: column;
  > div {
    > div {
      display:flex;
      align-items: center;
      height: 38px;
      > span {
        font-size: 24px;
      }
    }
  }
}
div.total {
  display: flex;
  width: 100%;
  > div {
    width: 40%;
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    > div {
      padding: 10px 0;
    }
  }
}
</style>