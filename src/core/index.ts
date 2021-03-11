import {Application, utils} from 'pixi.js'
import {appOptions} from "./configs";

export const createGameApp = (): Application => {
    utils.skipHello()
    return new Application(appOptions)
}
