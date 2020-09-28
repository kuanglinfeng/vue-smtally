<template>
  <Layout>
    Bill页
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import dayjs from 'dayjs'

@Component({
  components: { Layout }
})
export default class Bill extends Vue {



  created() {
    const record: RecordItem = {
      type: '-',
      tag: {title: '其它', value: 'other'},
      amount: 444,
      date: dayjs().toDate(),
      remark: ''
    }
    // this.$store.commit('addRecord', record)

    // this.$store.commit('getRecordById', '8')
    // console.log(this.$store.state)

    // this.$store.commit('editRecord', {id: '3', record: record})
    // console.log(this.$store.state)
    // this.$store.commit('removeRecord', '3')
  }

  mounted() {
    // this.$store.commit('getAllRecords')

    // console.log(this.$store.state.records)
  }
}
</script>

<style scoped lang="scss">

</style>