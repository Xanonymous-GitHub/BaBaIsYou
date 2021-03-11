<template>
  <main id="game-layer"
        class="
        flex
        h-screen
        justify-center
        relative
        dark:bg-gray-900
        bg-white">
    <div ref="gameLayer"
         class="
         game-layer
         self-center"
    />
  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {createGameApp} from '../core'

export default defineComponent({
  name: "GameLayer",
  setup() {
    const gameLayer = ref<HTMLElement>({} as HTMLElement)

    onMounted(() => {
      const gameConcrete = createGameApp()
      gameLayer.value.appendChild(
        gameConcrete.view
      )
    })

    return {
      gameLayer
    }
  }
})
</script>

<style lang="scss" scoped>
.game-layer {
  max-height: min-content;
  min-height: max-content;
  height: min-content;
}
</style>
