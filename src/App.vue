<template>
  <BattleLayer/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import './assets/scss/app.scss'
import BattleLayer from "./layout/BattleLayer.vue";

export default defineComponent({
  name: 'App',
  components: {
    BattleLayer
  }
})
</script>

<style lang="scss">
</style>
