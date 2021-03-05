<template>
  <main id="battle-layer"
        class="
        flex
        h-screen
        justify-center
        relative
        dark:bg-gray-900
        bg-white">
    <div ref="battleLayer"
         class="
         battle-layer
         self-center"
    />
  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import gameConcrete from '../core'

export default defineComponent({
  name: "BattleLayer",
  setup() {
    const battleLayer = ref<HTMLElement>({} as HTMLElement)

    onMounted(() => {
      battleLayer.value.appendChild(
          gameConcrete
      )
    })

    return {
      battleLayer
    }
  }
})
</script>

<style lang="scss" scoped>
.battle-layer {
  max-height: min-content;
  min-height: max-content;
  height: min-content;
}
</style>
