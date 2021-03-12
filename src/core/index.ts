import {createGameApp} from "./app";
import {createGameStore} from "./store";

const app = createGameApp()
const store = createGameStore()

// load start scene

// start listen keyboard event
store.initCommandWatchService()

export const appView = app.view