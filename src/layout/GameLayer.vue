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

export default defineComponent({
  name: 'GameLayer',
  setup() {
    const gameLayer = ref<HTMLElement>({} as HTMLElement)

    onMounted(async () => {
      const GameAppView = await (async () => await (await import('@/core')).default)() as unknown as HTMLCanvasElement
      gameLayer.value.appendChild(
          GameAppView
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
