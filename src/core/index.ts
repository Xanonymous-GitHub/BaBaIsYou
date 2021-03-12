import {createGameApp} from './app';
import {createGameStore} from './store';
import {DEBUG_RESOURCES} from './loaders';

const app = createGameApp()
const store = createGameStore()

// load start scene @DEBUG
app.loader.add(DEBUG_RESOURCES).load(() => {
    console.log('DEBUG_RESOURCES is loaded.')
})

// start listen keyboard event
store.initCommandWatchService()

export const appView = app.view