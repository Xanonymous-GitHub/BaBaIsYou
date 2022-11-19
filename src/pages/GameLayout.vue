<template>
  <Menu
    v-if='showMenu' :key='"menu"+menuKey' :mode='menuType'
    @restart='restartGame'
    @resume='handleEsc'
    @to-menu='toMenu'
    @to-home='toHome'
  />
  <NoYouAlertBar v-if='showNoYouAlertBar' :key='"alertBar"+alertBarKey' />
  <div
    id='game-layer'
    class='
       transform-gpu
        flex
        h-screen
        justify-center
        relative
        bg-gray-900'>
    <div
      ref='gameLayer'
      class='
         game-layer
         self-center'
    />
  </div>
</template>

<script lang='ts' setup>
  import { defineAsyncComponent, ref } from 'vue'
  import { tryOnMounted } from '@vueuse/core'
  import GamePack from '@/core'
  import type { GameCore } from '@/core/types'
  import { GameResult } from '@/core/types'
  import type { ExtendedKeyboardEvent } from 'mousetrap'
  import mousetrap from 'mousetrap'
  import { useGlobalState } from '@/store'
  import { useRouter } from 'vue-router'
  import { MenuType } from '@/types'
  import '@/assets/scss/shared/abscenter.scss'

  const globalState = useGlobalState()
  const router = useRouter()

  const gameLayer = ref<HTMLElement>({} as HTMLElement)

  const showMenu = ref(false)
  const showNoYouAlertBar = ref(false)

  const menuKey = ref(0)
  const alertBarKey = ref(0)

  const menuType = ref(MenuType.GENERAL)

  const Menu = defineAsyncComponent(() => import('@/components/MainMenu.vue'))
  const NoYouAlertBar = defineAsyncComponent(() => import('@/components/NoYouAlertBar.vue'))

  let game: GameCore
  const audio = document.createElement('audio')

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
      menuType.value = MenuType.GENERAL
    }
  }

  const handleR = (event: ExtendedKeyboardEvent) => {
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    menuType.value = MenuType.RESTART
    menuKey.value++
    gamePause()
    showMenu.value = true
  }

  const setAudioSrc = (filename: string) => {
    const pathPrefix = '/music/'
    audio.src = pathPrefix + filename
    audio.loop = true
  }

  const startNewGame = async () => {
    const setupFileName = globalState.value.currentLevel.setupFileName
    if (!setupFileName) return
    await game.startLevel(setupFileName.trim())
    showNoYouAlertBar.value = false
    mousetrap.bind('esc', handleEsc)
    mousetrap.bind('r', handleR)
    setAudioSrc(globalState.value.currentLevel.backgroundMusic)
    await audio.play()
  }

  const gameOver = async (result: GameResult) => {
    switch (result) {
      case GameResult.WIN:
        menuType.value = MenuType.WIN
        menuKey.value++
        mousetrap.unbind(['esc', 'r'])
        showMenu.value = true
        await audio.pause()
        break
      case GameResult.RESTART:
        await startNewGame()
        break
    }
  }

  const handleYouGone = async (existYou: boolean) => {
    audio.pause()
    if (!existYou) {
      alertBarKey.value++
    }
    showNoYouAlertBar.value = !existYou
  }

  const prepareGame = () => {
    game.setGameOverOutsideHandler(gameOver)
    game.setYouGoneOutsideHandler(handleYouGone)

    gameLayer.value.appendChild(
      game.gameView
    )
  }

  const restartGame = () => {
    handleEsc()
    startNewGame()
  }

  const toMenu = async () => {
    audio.pause()
    await router.replace({ name: 'Level' })
  }

  const toHome = async () => {
    audio.pause()
    await router.replace({ name: 'Home' })
  }

  tryOnMounted(async () => {
    game = await (async () => await GamePack)()
    prepareGame()
    await startNewGame()
  })
</script>

<style lang='scss' scoped>
  .game-layer {
    max-height: min-content;
    min-height: max-content;
    height: min-content;
  }
</style>
