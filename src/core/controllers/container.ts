import {GameStore} from "../store";
import {Controller} from "./";
import {SceneSetup} from "../types";
import {Container} from 'pixi.js'

class ContainerControllerConcrete extends Controller {
    constructor(store: GameStore) {
        super(store)
    }

    public createScene(sceneSetup: SceneSetup<any>) {
        // find if there has any empty container.
        const emptyContainerPackage = this._store.getEmptyContainer()
        let emptyContainer!: Container
        if (emptyContainerPackage) {
            emptyContainer = emptyContainerPackage.container
        } else {
            emptyContainer = new Container()
        }

        // call sprite controller to make all elements that needed.

    }
}

export const createContainerController = (store: GameStore) => {
    return new ContainerControllerConcrete(store)
}

export type ContainerController = ReturnType<typeof createContainerController>