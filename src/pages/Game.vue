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
  import GamePack from '@/core'
  import { GameResult } from '@/core/types'

  const gameLayer = ref<HTMLElement>({} as HTMLElement)

  const gameOver = async (result: GameResult) => {
    console.log(result)
  }

  const startGame = async () => {
    const game = await (async () => await GamePack)()

    await game.setGameOverOutsideHandler(gameOver)
    await game.startLevel('example.json')

    gameLayer.value.appendChild(
      game.gameView
    )
  }

  onMounted(async () => {
    await startGame()
  })
</script>

<style lang='scss' scoped>
  .game-layer {
    max-height: min-content;
    min-height: max-content;
    height: min-content;
  }
</style>
