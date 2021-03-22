import {createGameApp} from './app';
import {createGameStore} from './store';
import {createStageController} from './controllers/stage'
import {createContainerController} from './controllers/container'
import {createSpriteController} from './controllers/sprite'
import {createResourceMap} from './resource';
import {createThingCommandDispatchServer} from './observer';
import {RESOURCE_ROOT_PATH} from './app/configs';
import {SceneSetup} from './types'
import {ThingSetup} from './types/things';
import {Species} from './resource';

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
store.setDispatchServer(createThingCommandDispatchServer(store))

// DEBUG
const thingsMap = new Map<{ species: Species; name: string }, Array<ThingSetup>>()
thingsMap.set({species: Species.CHARACTERS, name: 'BABA'},
    [{
        defaultBlockX: 0,
        defaultBlockY: 0,
        defaultTowards: 0,
        maxBlockX: 29,
        maxBlockY: 19,
        textureName: 'BABA'
    }])
// thingsMap.set({species: Species.NOUNS, name: 'Text_BABA'},
//     [{
//         defaultBlockX: 10,
//         defaultBlockY: 10,
//         maxBlockX: 29,
//         maxBlockY: 19,
//         textureName: 'Text_BABA'
//         defaultTowards: 0,
//     }])
const TEST_SCENE: SceneSetup = {
    name: '__DEBUG__',
    id: '__DEBUG__',
    thingsMap
}
stageController.addScene(TEST_SCENE).then(() => {
    store.initDispatchServer()
})

app.ticker.add(() => {
    store.getDispatchServer().run()
})


// start listen keyboard event
store.initCommandWatchService()

export const appView = app.view