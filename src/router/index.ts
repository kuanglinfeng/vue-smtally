import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Bill from '@/views/Bill.vue'
import Add from '@/views/Add.vue'
import Chart from '@/views/Chart.vue'
import NotFound from '@/views/NotFound.vue'
import Tags from '@/views/Tags.vue'
import RankDetail from '@/views/RankDetail.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/bill'
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/rankDetail',
    name: 'RankDetail',
    component: RankDetail
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
