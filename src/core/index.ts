import {createGameApp} from './app';
import {createGameStore} from './store';
import {createStageController} from './builders/stage'
import {createContainerController} from './builders/container'
import {createSpriteController} from './builders/sprite'
import {createResourceMap} from './resource';
import {createInstructionDispatchServer} from './observer';
import {createRuleController} from './observer/rule';
import {createMapController} from './observer/map';
import {createRuleScanner} from './utils/ruleScanner';
import {RESOURCE_ROOT_PATH} from './app/configs';
import {getSceneSetup} from './utils/sceneSetup';

const app = createGameApp()
const store = createGameStore()
const spriteController = createSpriteController(store)
const containerController = createContainerController(store, spriteController)
const stageController = createStageController(store, app.stage, containerController)
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
    const TEST_SCENE = await getSceneSetup('demo.json')
    console.log(TEST_SCENE)

    stageController.addScene(TEST_SCENE).then(() => {
        store.initDispatchServer()
    })

    app.ticker.add(() => {
        store.getDispatchServer().run()
    })

    // start listen keyboard event
    store.initCommandWatchService()
}

setupGame().then()

export const appView = app.view