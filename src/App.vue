<template>
  <BattleLayer/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BattleLayer from "./layout/BattleLayer.vue";

export default defineComponent({
  name: 'App',
  components: {
    BattleLayer
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
