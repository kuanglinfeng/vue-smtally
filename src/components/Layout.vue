<template>
  <div class="layout">
    <main>
      <slot />
    </main>
    <Nav />
  </div>
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue'
export default {
  name: 'Layout',
  components: {Nav}
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