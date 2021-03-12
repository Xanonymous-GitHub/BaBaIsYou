import {Container} from 'pixi.js'
import {SceneSetup} from '../types';
import {ContainerController} from './container';
import {GameStore} from '../store';
import {Controller} from './';

class StageControllerConcrete extends Controller {
    private readonly _stage: Container
    private readonly _containerController: ContainerController

    constructor(store: GameStore, stage: Container, containerController: ContainerController) {
        super(store)
        this._stage = stage
        this._containerController = containerController
    }

    public async addScene(sceneSetup: SceneSetup<any>) {
        // 1. check if the scene is already mounted on the stage.
        // 2. call container controller to make the loading scene.
        // 3. receive the scene from container controller.
        // 4. mount the scene on stage at index 0.
        if (!(this._stage.getChildByName ? (sceneSetup.name) : undefined)) {

        }
    }

    public async removeScene() {
        // 1. check if the scene is already mounted on the stage.
        // 2. check the index of the loading scene.
        // 3. unmount the loading scene.
        // 4. save the scene to store for future operations.
    }

    public async showScene() {

    }

    public async hideScene() {

    }
}

export const createStageController = (store: GameStore, stage: Container, containerController: ContainerController) => {
    return new StageControllerConcrete(store, stage, containerController)
}

export type StageController = ReturnType<typeof createStageController>