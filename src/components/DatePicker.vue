<template>
  <div class="datePicker-wrapper">
    <div class="calendar" @click="openPicker">
      {{ showDate }}
    </div>
    <mt-datetime-picker
      v-model="date"
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="onConfirm"
    >
    </mt-datetime-picker>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import { DatetimePicker } from 'mint-ui'
import dayjs from 'dayjs'

Vue.component(DatetimePicker.name, DatetimePicker)

@Component({
  components: {}
})
export default class extends Vue {

  @Prop({type: Date}) defaultDate!: Date

  date = dayjs().toDate()
  showDate = dayjs(this.date).date()

  created() {
    if (this.defaultDate) {
      this.date = this.defaultDate
    }
  }

  @Watch('date')
  onDateChange() {
    this.showDate = dayjs(this.date).date()
  }

  @Emit()
  onConfirm(value: Date) {
    return value
  }

  openPicker() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.$refs.picker.open();
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.datePicker-wrapper {
  display: inline-block;
  padding: 10px;
  background: $theme-fadeColor;
  .icon {
    width: 40px;height: 40px;
  }
}

.calendar {
  position: relative;
  width: 32px;  height: 32px;
  background: #CDF9EA;
  opacity: 1;
  border-radius: 4px;
  border: 2px solid $theme-color;
  color: $theme-color;
  text-align: center;
  line-height: 32px;
  font-size: 12px;
  &::before {
    position: absolute;
    content: '';
    display:block;
    width: 2px; height: 6px;
    background: $theme-color;
    top: -3px; left: 8px;
  }
  &::after {
    position: absolute;
    content: '';
    display:block;
    width: 2px; height: 6px;
    background: $theme-color;
    top: -3px; right: 8px;
  }
}
</style>