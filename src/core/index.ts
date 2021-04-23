import {createGameApp} from './app';
import {createGameStore} from './store';
import {createStageController} from './controllers/stage'
import {createContainerController} from './controllers/container'
import {createSpriteController} from './controllers/sprite'
import {createResourceMap} from './resource';
import {createInstructionDispatchServer} from './observer';
import {createRuleController} from './observer/rule';
import {createMapController} from './observer/map';
import {RESOURCE_ROOT_PATH} from './app/configs';
import {getSceneSetup} from './utils/sceneSetup';

const app = createGameApp()
const store = createGameStore()
const spriteController = createSpriteController(store)
const containerController = createContainerController(store, spriteController)
const stageController = createStageController(store, app.stage, containerController)
const RESOURCES_MAP = createResourceMap(RESOURCE_ROOT_PATH)

// add resource map.
store.addResourceMap(RESOURCES_MAP)

// init dispatcher.
store.setDispatchServer(createInstructionDispatchServer(store))

// init map controller.
store.setMapController(createMapController(store.getAppEdge()))

// init rule controller.
store.setRuleController(createRuleController(store.getMapController()))

// DEBUG
const setupGame = async () => {
    const TEST_SCENE = await getSceneSetup('level1.json')
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