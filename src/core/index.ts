import { createGameApp } from './app'
import { createGameStore } from './store'
import { createStageBuilder } from './builders/stage'
import { createContainerBuilder } from './builders/container'
import { createSpriteBuilder } from './builders/sprite'
import { startLevel, setGameOverOutsideHandler, setYouGoneOutsideHandler, pause, resume } from '@/core/game'
import type { GameCore } from '@/core/types'
import { appOptions } from './app/configs'

const app = createGameApp()

export const store = createGameStore()

const gameInit = async () => {
  await app.init(appOptions)
  store.bindAppToScreenService(app)

  const spriteController = createSpriteBuilder()
  store.setSpriteBuilder(spriteController)

  const containerController = createContainerBuilder()
  store.setContainerBuilder(containerController)

  const stageController = createStageBuilder(app.stage)
  store.setStageBuilder(stageController)
}

let initialization: Promise<void> | undefined

const gameCore = async (): Promise<GameCore> => {
  initialization ??= gameInit()
  await initialization
  return {
    gameView: app.canvas,
    startLevel,
    pause,
    resume,
    setYouGoneOutsideHandler,
    setGameOverOutsideHandler
  }
}

export default gameCore
