<template>
  <div class="remark-wrapper">
    <span>备注：</span>
    <label>
      <input type="text" class="remark" v-model="remark">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class extends Vue {

  @Prop({ type: String }) defaultRemark!: string

  remark = ''

  created() {
    if (this.defaultRemark) {
      this.remark = this.defaultRemark
    }
  }

  @Watch('remark')
  @Emit()
  onRemarkChange(remark: string) {
    return remark
  }
}
</script>

<style scoped lang="scss">
.remark-wrapper {
  display: inline-block;
  font-size: 14px;
  span {
    display: inline-block;
    height: 52px;
    line-height: 52px;
  }
  input {
    overflow: auto;
    height: 52px;
    background: inherit;
    width: 25vw;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
</style>