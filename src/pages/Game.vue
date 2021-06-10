<template>
  <div id='game-layer'
       class='
        flex
        h-screen
        justify-center
        relative
        dark:bg-gray-900
        bg-white'>
    <div ref='gameLayer'
         class='
         game-layer
         self-center'
    />
  </div>
</template>

<script setup lang='ts'>
  import { onMounted, ref } from 'vue'
  import Game from '@/core'

  const gameLayer = ref<HTMLElement>({} as HTMLElement)

  onMounted(async () => {
    const GameAppView = await (async () => await Game)() as unknown as HTMLCanvasElement
    gameLayer.value.appendChild(
      GameAppView
    )
  })
</script>

<style lang='scss' scoped>
  .game-layer {
    max-height: min-content;
    min-height: max-content;
    height: min-content;
  }
</style>
