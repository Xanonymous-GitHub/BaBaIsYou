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
import { getSceneSetup } from './resource/sceneSetup'

const app = createGameApp()
const store = createGameStore()
const spriteController = createSpriteBuilder(store)
const containerController = createContainerBuilder(store, spriteController)
const stageController = createStageBuilder(store, app.stage, containerController)

store.setStageBuilder(stageController)
store.setContainerBuilder(containerController)
store.setSpriteBuilder(spriteController)

const RESOURCES_MAP = createResourceMap(RESOURCE_ROOT_PATH)

// bind app to screen service.
store.bindAppToScreenService(app)

// add resource map.
store.addResourceMap(RESOURCES_MAP)

// init dispatcher.
store.setDispatchServer(createInstructionDispatchServer(store))

// init map controller.
store.setMapController(createMapController())

// init rule controller.
store.setRuleController(createRuleController(store.getMapController()))

// init rule scanner.
store.setScanner(createRuleScanner(store.getRuleController(), store.getMapController()))

// DEBUG
const setupGame = async () => {
  const TEST_SCENE = await getSceneSetup('level6.json')

  stageController.addGameScene(TEST_SCENE).then(() => {
    store.initDispatchServer()
  })

  // stageController.addWinScene().then()

  app.ticker.add(() => {
    store.getDispatchServer().run()
  })

  // start listen keyboard event
  store.initCommandWatchService()
}

setupGame().then()

const appView = app.view

export default new Promise($export => $export(appView))