<template>
  <div id='game-layer'
       class='
       transform-gpu
        flex
        h-screen
        justify-center
        relative
        bg-gray-900'>
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
  import { ref } from 'vue'
  import { tryOnMounted } from '@vueuse/core'
  import GamePack from '@/core'
  import { GameResult } from '@/core/types'
  import WinText from '@/components/WinText.vue'
  import { useGlobalState } from '@/store'

  const gameLayer = ref<HTMLElement>({} as HTMLElement)
  const showWinText = ref(false)
  const globalState = useGlobalState()

  const gameOver = async (result: GameResult) => {
    if (result === GameResult.WIN) {
      showWinText.value = true
      await new Promise() // DEBUG
    }
  }

  const startGame = async () => {
    const setupFileName = globalState.value.currentLevel.setupFileName
    if (!setupFileName) return

    const game = await (async () => await GamePack)()

    await game.setGameOverOutsideHandler(gameOver)
    await game.startLevel(setupFileName.trim())

    gameLayer.value.appendChild(
      game.gameView
    )
  }

  tryOnMounted(async () => {
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
