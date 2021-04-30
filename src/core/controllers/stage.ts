import {Container} from 'pixi.js'
import {SceneSetup} from '../types';
import {ContainerController} from './container';
import {GameStore} from '../store';
import {Controller} from './';
import {MountContainerToStageAtIndexTask} from '../tasks/stage'

class StageControllerConcrete extends Controller {
    private readonly _stage: Container
    private readonly _containerController: ContainerController

    constructor(store: GameStore, stage: Container, containerController: ContainerController) {
        super(store)
        this._stage = stage
        this._containerController = containerController
    }

    public async addScene(sceneSetup: SceneSetup) {
        this._store.setAppSize(sceneSetup.sceneWidth, sceneSetup.sceneHeight)
        const scene = await this._containerController.createScene(sceneSetup)
        const mountTask = new MountContainerToStageAtIndexTask()
        mountTask.setArgs(this._stage, scene, 0)
        await mountTask.execute()
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