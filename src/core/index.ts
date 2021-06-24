import { createGameApp } from './app'
import { createGameStore } from './store'
import { createStageBuilder } from './builders/stage'
import { createContainerBuilder } from './builders/container'
import { createSpriteBuilder } from './builders/sprite'
import { createResourceMap } from './resource'
import { RESOURCE_ROOT_PATH } from './app/configs'
import { startLevel, setGameOverOutsideHandler, pause, resume } from '@/core/game'
import type { GameCore } from '@/core/types'

const app = createGameApp()
export const store = createGameStore()

store.bindAppToScreenService(app)

const spriteController = createSpriteBuilder()
store.setSpriteBuilder(spriteController)

const containerController = createContainerBuilder()
store.setContainerBuilder(containerController)

const stageController = createStageBuilder(app.stage)
store.setStageBuilder(stageController)

const RESOURCES_MAP = createResourceMap(RESOURCE_ROOT_PATH)
store.addResourceMap(RESOURCES_MAP)

const gameCore: GameCore = {
  gameView: app.view,
  startLevel,
  pause,
  resume,
  setGameOverOutsideHandler
}

export default new Promise<GameCore>($export => $export(gameCore))