import { Container } from 'pixi.js'
import { SceneSetup } from '@/core/types'
import { ContainerController } from './container'
import { GameStore } from '@/core/store'
import { Controller } from './'
import { MountContainerToStageAtIndexTask } from '@/core/tasks/stage'

export class StageControllerConcrete extends Controller {
  private readonly _stage: Container
  private readonly _containerController: ContainerController

  constructor(store: GameStore, stage: Container, containerController: ContainerController) {
    super(store)
    this._stage = stage
    this._stage.sortableChildren = true
    this._containerController = containerController
  }

  public async addGameScene(sceneSetup: SceneSetup) {
    this._store.setAppSize(sceneSetup.sceneWidth, sceneSetup.sceneHeight)
    this._store.changeMapSize(this._store.getAppEdge())
    const scene = await this._containerController.createGameScene(sceneSetup)
    const mountTask = new MountContainerToStageAtIndexTask()
    mountTask.setArgs(this._stage, scene, 0)
    await mountTask.execute()
  }

  public async addWinScene() {
    const scene = await this._containerController.createWinScene()
    const mountTask = new MountContainerToStageAtIndexTask()
    mountTask.setArgs(this._stage, scene, 0)
    await mountTask.execute()
    console.log(this._stage)
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