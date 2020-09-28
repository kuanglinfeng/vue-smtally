<template>
  <Layout>
    <Header>
      <RadioMenu :values="['支出', '收入']" @on-select="onAmountTypeSelect" />
    </Header>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import Header from '@/components/bill/Header.vue'
import RadioMenu from '@/components/RadioMenu.vue'

@Component({
  components: { RadioMenu, Layout, Header }
})
export default class extends Vue {

  amountType = '支出'

  onAmountTypeSelect(value: string) {
    console.log('amountType', value)
    this.amountType = value
  }
}
</script>

<style scoped lang="scss">

</style>