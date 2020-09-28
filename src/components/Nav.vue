<template>
  <nav>
    <ul>
      <li>
        <router-link to="/bill" active-class="selected">
          <Icon value="bill" />
          账单
        </router-link>
      </li>
      <li class="add">
        <router-link to="/add" active-class="selected">
          <Icon value="add" />
          记一笔
        </router-link>
      </li>
      <li>
        <router-link to="/chart" active-class="selected">
          <Icon value="chart" />
          图表
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Icon from '@/components/Icon.vue'

export default {
  name: 'Nav',
  components: { Icon }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variable.scss";
nav {
  box-shadow: 0 0 3px rgba(0, 0, 0, .25);
  line-height: 24px;
  > ul {
    display: flex;
    > li {
      width: 33.333333%;
      &.add {
        .icon {fill: $theme-color}
      }
      > a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        padding-top: 4px;
        > .icon {
          height: 32px; width: 32px;
        }
        &.selected {
          > .icon {fill: $theme-color}
        }
      }
    }
  }
}
</style>