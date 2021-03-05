<template>
  <GameLayer/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import GameLayer from "./layout/GameLayer.vue";

export default defineComponent({
  name: 'App',
  components: {
    GameLayer
  }
})
</script>

<style lang="scss">
</style>
