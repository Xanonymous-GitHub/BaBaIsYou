<template>
  <Menu v-if='showMenu' :key='"menu"+menuKey'
        @resume='handleEsc'
        @restart='restartGame'
  />
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
  import { ref, defineAsyncComponent } from 'vue'
  import { tryOnMounted } from '@vueuse/core'
  import GamePack from '@/core'
  import { GameResult } from '@/core/types'
  import type { GameCore } from '@/core/types'
  import mousetrap from 'mousetrap'
  import type { ExtendedKeyboardEvent } from 'mousetrap'
  import { useGlobalState } from '@/store'

  const globalState = useGlobalState()

  const gameLayer = ref<HTMLElement>({} as HTMLElement)

  const showWinText = ref(false)
  const showMenu = ref(false)
  const menuKey = ref(0)

  const Menu = defineAsyncComponent(() => import('@/components/Menu.vue'))
  const WinText = defineAsyncComponent(() => import('@/components/WinText.vue'))

  let game: GameCore

  const startNewGame = async () => {
    const setupFileName = globalState.value.currentLevel.setupFileName
    if (!setupFileName) return
    await game.startLevel(setupFileName.trim())
  }

  const gameOver = async (result: GameResult) => {
    switch (result) {
      case GameResult.WIN:
        showWinText.value = true
        await new Promise() // DEBUG
        break
      case GameResult.RESTART:
        await startNewGame()
        break
    }
  }

  const prepareGame = async () => {
    await game.setGameOverOutsideHandler(gameOver)

    gameLayer.value.appendChild(
      game.gameView
    )
  }

  const gamePause = () => {
    game.pause()
  }

  const gameResume = () => {
    game.resume()
  }

  const handleEsc = (event?: ExtendedKeyboardEvent) => {
    event?.preventDefault()
    event?.stopImmediatePropagation()
    event?.stopPropagation()
    menuKey.value++
    showMenu.value = !showMenu.value
    if (showMenu.value) {
      gamePause()
    } else {
      gameResume()
    }
  }

  const restartGame = () => {
    handleEsc()
    startNewGame()
  }

  mousetrap.bind('esc', handleEsc)

  tryOnMounted(async () => {
    game = await (async () => await GamePack)()
    await prepareGame()
    await startNewGame()
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
