<template>
  <div class="datePicker-wrapper">
    <div class="calendar" @click="openPicker">
      {{ showDate }}
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      get-container="body"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择日期"
        @cancel="cancel"
        @change="change"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'

@Component({})
export default class extends Vue {

  @Prop({ type: Date }) defaultDate!: Date

  show = false

  currentDate = dayjs().toDate()
  showDate = dayjs(this.currentDate).date()

  created() {
    this.show = false
    if (this.defaultDate) {
      this.currentDate = this.defaultDate
    }
  }

  @Watch('currentDate')
  change() {
    this.showDate = dayjs(this.currentDate).date()
  }

  @Emit()
  confirm(value: Date) {
    this.show = false
    return value
  }

  cancel() {
    this.show = false
  }

  openPicker() {
    this.show = true
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
  width: 32px; height: 32px;
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
    display: block;
    width: 2px; height: 6px;
    background: $theme-color;
    top: -3px; left: 8px;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    width: 2px; height: 6px;
    background: $theme-color;
    top: -3px; right: 8px;
  }
}
</style>