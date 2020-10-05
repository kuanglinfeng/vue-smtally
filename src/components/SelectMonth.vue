<template>
  <div class="selectMonth-wrapper">
    <div class="selectMonth" @click="showPicker = true">
      <span>{{ currentMonth }}</span>
      <div>月<Icon value="down"/></div>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
      get-container="body"
    >
      <van-picker
        show-toolbar
        :columns="months"
        @cancel="showPicker = false"
        @confirm="confirm"
        :default-index="currentMonth - 1"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import months from '@/constants/months'
import dayjs from 'dayjs'

@Component({
  components: { Icon }
})
export default class extends Vue {

  @Prop({type: Number}) month!: number

  showPicker = false
  currentMonth = dayjs().month() + 1
  months = months

  created() {
    if (this.month) {
      this.currentMonth = this.month
    }
  }

  @Emit()
  confirm(month: string) {
    this.showPicker = false
    this.currentMonth = parseInt(month)
    return parseInt(month)
  }
}
</script>

<style scoped lang="scss">

</style>