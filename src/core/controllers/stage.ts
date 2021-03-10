import * as PIXI from 'pixi.js'
import {SceneSetup} from "@/core/types";

class StageController {
    private readonly _stage: PIXI.Container

    constructor(stage: PIXI.Container) {
        this._stage = stage
    }

    public async showScene(sceneSetup: SceneSetup<any>) {
        // 1. check if the scene is already mounted on the stage.
        // 2. call container controller to make the loading scene.
        // 3. receive the scene from container controller.
        // 4. mount the scene on stage at index 0.
    }

    public async removeScene() {
        // 1. check if the scene is already mounted on the stage.
        // 2. check the index of the loading scene.
        // 3. unmount the loading scene.
        // 4. save the scene to store for future operations.
    }
}