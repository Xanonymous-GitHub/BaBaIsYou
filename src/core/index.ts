import { createGameApp } from './app'
import { createGameStore } from './store'
import { createStageBuilder } from './builders/stage'
import { createContainerBuilder } from './builders/container'
import { createSpriteBuilder } from './builders/sprite'
import { createResourceMap } from './resource'
import { createInstructionDispatchServer } from './controllers/dispatcher'
import { createRuleController } from './controllers/rule'
import { createMapController } from './controllers/map'
import { createRuleScanner } from './controllers/tools/ruleScanner'
import { RESOURCE_ROOT_PATH } from './app/configs'
import { GameCore } from '@/core/types'
import { startLevel } from '@/core/game'

const app = createGameApp()
export const store = createGameStore()

store.bindAppToScreenService(app)

const spriteController = createSpriteBuilder(store)
store.setSpriteBuilder(spriteController)

const containerController = createContainerBuilder(store)
store.setContainerBuilder(containerController)

const stageController = createStageBuilder(store, app.stage)
store.setStageBuilder(stageController)

const RESOURCES_MAP = createResourceMap(RESOURCE_ROOT_PATH)
store.addResourceMap(RESOURCES_MAP)

const dispatcher = createInstructionDispatchServer(store)
store.setDispatchServer(dispatcher)
store.connectDispatchListener(dispatcher.commandListener)

const mapController = createMapController()
store.setMapController(mapController)

const ruleController = createRuleController(mapController)
store.setRuleController(ruleController)

const scanner = createRuleScanner(ruleController, mapController)
store.setScanner(scanner)

const gameCore: GameCore = {
  gameView: app.view,
  startLevel
}

export default new Promise<GameCore>($export => $export(gameCore))