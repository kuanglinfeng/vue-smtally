<template>
  <div class="layout">
    <main>
      <slot />
    </main>
    <Nav />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'

@Component({
  components: {Nav}
})
export default class extends Vue{

}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  > main {
    flex-grow: 1;
  }
}
</style>