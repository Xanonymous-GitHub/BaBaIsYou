import {Controller} from "./";
import {GameStore} from "../store";

class SpriteControllerConcrete extends Controller {
    constructor(store: GameStore) {
        super(store)
    }
}

export const createSpriteController = (store: GameStore) => {
    return new SpriteControllerConcrete(store)
}

export type SpriteController = ReturnType<typeof createSpriteController>