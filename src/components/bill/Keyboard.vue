<template>
  <div class="keyboard-wrapper">
    <button @click="onNumberClick">1</button>
    <button @click="onNumberClick">2</button>
    <button @click="onNumberClick">3</button>
    <button @click="onAdd">+</button>
    <button @click="onNumberClick">4</button>
    <button @click="onNumberClick">5</button>
    <button @click="onNumberClick">6</button>
    <button @click="onSubtract">-</button>
    <button @click="onNumberClick">7</button>
    <button @click="onNumberClick">8</button>
    <button @click="onNumberClick">9</button>
    <button class="save" @click="save">{{ adding || subtracting ? '=' : '保存' }}</button>
    <button @click="onNumberClick">.</button>
    <button @click="onNumberClick">0</button>
    <button @click="clear">
      <Icon value="clear" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Toast } from 'mint-ui';
import Icon from '@/components/Icon.vue'

Vue.component(Toast.name, Toast)

@Component({
  components: { Icon }
})
export default class extends Vue {

  @Prop({ type: String }) defaultAmount!: string

  amount = '0'
  adding = false
  subtracting = false
  firstAmount = '0'
  secondAmount = '0'

  @Watch('amount')
  onAmountChange() {
    // change
    this.$emit('amountChange', this.amount)
  }

  created() {
    if (this.defaultAmount) {
      this.amount = this.defaultAmount
    }
  }

  save() {
    if (this.adding) {
      const totalAmount = parseFloat(this.firstAmount) + parseFloat(this.secondAmount)
      this.amount = totalAmount + ''
      this.firstAmount = totalAmount + ''
      this.secondAmount = '0'
      this.adding = false
    } else if (this.subtracting) {
      const totalAmount = parseFloat(this.firstAmount) - parseFloat(this.secondAmount)
      this.amount = totalAmount + ''
      this.firstAmount = totalAmount + ''
      this.secondAmount  ='0'
      this.subtracting = false
    } else {
      const formatAmount = parseFloat(parseFloat(this.amount).toFixed(2))
      if (formatAmount < 0) {
        Toast('请输入正确的金额哦！')
      } else {
        // 提交
        this.$emit('submit', formatAmount)
        this.clear()
      }
    }
  }

  onNumberClick(e: any) {
    const button = e.target as HTMLButtonElement
    const inputValue = button.textContent || '0'
    // 如果已经是个小数了，且小数点后面有两位了，则不允许再叠加数字
    if (this.amount.indexOf('.') !== -1 && this.amount.split('.')[1].length === 2) return
    if (this.amount.length === 12) return
    // 开启计算模式
    if (this.adding || this.subtracting) {
      this.secondAmount = this.secondAmount === '0' ? inputValue : this.secondAmount + inputValue
      this.amount = this.amount + inputValue
      return
    }
    if (this.amount !== '0' && this.amount.indexOf('.') >= 0 && inputValue === '.') return
    if (this.amount === '0' && inputValue === '.') {
      this.amount = this.amount + inputValue
    } else if (this.amount === '0' && inputValue !== '.') {
      this.amount = inputValue
    } else {
      this.amount = this.amount + inputValue
    }
  }

  clear() {
    this.adding = false
    this.subtracting = false
    this.firstAmount = '0'
    this.secondAmount = '0'
    this.amount = '0'
  }

  onAdd() {
    if (this.amount === '0') return
    if (this.subtracting) {
      const total = parseFloat(this.firstAmount) - parseFloat(this.secondAmount)
      this.amount = total + '+'
      this.firstAmount = total + ''
      this.secondAmount = '0'
      this.subtracting = false
      this.adding = true
      return
    }
    if (this.adding) {
      const total = parseFloat(this.firstAmount) + parseFloat(this.secondAmount)
      this.amount = total + '+'
      this.firstAmount = total + ''
      this.secondAmount = '0'
    } else {
      this.adding = true
      this.firstAmount = parseFloat(this.amount).toFixed(2)
      this.amount = this.amount + '+'
    }
  }

  onSubtract() {
    if (this.amount === '0') return
    if (this.adding) {
      const total = parseFloat(this.firstAmount) + parseFloat(this.secondAmount)
      this.amount = total + '-'
      this.firstAmount = total + ''
      this.secondAmount = '0'
      this.adding = false
      this.subtracting = true
      return
    }
    if (this.subtracting) {
      const total = parseFloat(this.firstAmount) - parseFloat(this.secondAmount)
      this.amount = total + '-'
      this.firstAmount = total + ''
      this.secondAmount = '0'
    } else {
      this.subtracting = true
      this.firstAmount = parseFloat(this.amount).toFixed(2)
      this.amount = this.amount + '-'
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";

.keyboard-wrapper {
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    font-size: 20px;
    padding: 4px 8px;
    width: 25%;
    box-shadow: 0 0 1px rgba(0, 0, 0, .25);
    height: 54px;
    &:active {
      background: #ccc;
      opacity: .6;
    }
    &.save {
      height: 108px;
      float: right;
      color: #fff;
      background: $theme-color;
      &:active {
        opacity: .7;
      }
    }
    > .icon {
      width: 20px; height: 20px;
    }
  }
}
</style>