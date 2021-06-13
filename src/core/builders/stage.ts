import { Container } from 'pixi.js'
import { SceneSetup } from '@/core/types'
import { ContainerBuilder } from './container'
import { GameStore } from '@/core/store'
import { Builder } from './'
import { MountContainerToStageAtIndexTask, UnmountContainerFromStageTask } from '@/core/builders/tasks/stage'

export class StageBuilderConcrete extends Builder {
  private readonly _stage: Container
  private readonly _containerBuilder: ContainerBuilder

  constructor(store: GameStore, stage: Container) {
    super(store)
    this._stage = stage
    this._stage.sortableChildren = true
    this._containerBuilder = store.getContainerBuilder()
  }

  public async addGameScene(sceneSetup: SceneSetup) {
    this._store.setAppSize(sceneSetup.sceneWidth, sceneSetup.sceneHeight)
    this._store.changeMapSize(this._store.getAppEdge())
    const scene = await this._containerBuilder.createGameScene(sceneSetup)
    const mountTask = new MountContainerToStageAtIndexTask()
    mountTask.setArgs(this._stage, scene, 0)
    await mountTask.execute()
  }

  public async addWinScene() {
    // to be removed.
    const scene = await this._containerBuilder.createWinScene()
    const mountTask = new MountContainerToStageAtIndexTask()
    mountTask.setArgs(this._stage, scene, 0)
    await mountTask.execute()
  }

  public async removeScene() {
    const targetScene = this._containerBuilder.gameScene
    const unMountTask = new UnmountContainerFromStageTask()
    unMountTask.setArgs(this._stage, targetScene)
    await unMountTask.execute()
  }
}

export const createStageBuilder = (store: GameStore, stage: Container) => {
  return new StageBuilderConcrete(store, stage)
}

export type StageBuilder = ReturnType<typeof createStageBuilder>