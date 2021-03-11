<template>
  <GameLayer/>
</template>

<script lang="ts">
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    GameLayer: defineAsyncComponent(() => import('./layout/GameLayer.vue'))
  }
})
</script>

<style lang="scss">
</style>
