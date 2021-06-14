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
    <WinText v-if='showWinText' class='
      inline-block
      absolute
      abs-center'
    />
  </div>
</template>

<script setup lang='ts'>
  import { onMounted, ref } from 'vue'
  import GamePack from '@/core'
  import { GameResult } from '@/core/types'
  import WinText from '@/components/WinText.vue'

  const gameLayer = ref<HTMLElement>({} as HTMLElement)
  const showWinText = ref(false)

  const gameOver = async (result: GameResult) => {
    if (result === GameResult.WIN) {
      showWinText.value = true
      await new Promise() // DEBUG
    }
  }

  const startGame = async () => {
    const game = await (async () => await GamePack)()

    await game.setGameOverOutsideHandler(gameOver)
    await game.startLevel('level7.json')

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

  .abs-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
