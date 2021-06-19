import type { Container } from 'pixi.js'
import type { SceneSetup } from '@/core/types'
import type { ContainerBuilder } from './container'
import { MountContainerToStageAtIndexTask, UnmountContainerFromStageTask } from '@/core/builders/tasks/stage'
import { store } from '@/core'

export class StageBuilderConcrete {
  private readonly _stage: Container
  private readonly _containerBuilder: ContainerBuilder

  constructor(stage: Container) {
    this._stage = stage
    this._stage.sortableChildren = true
    this._containerBuilder = store.getContainerBuilder()
  }

  public async addGameScene(sceneSetup: SceneSetup) {
    store.setAppSize(sceneSetup.sceneWidth, sceneSetup.sceneHeight)
    store.changeMapSize(store.getAppEdge())
    const scene = await this._containerBuilder.createGameScene(sceneSetup)
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

export const createStageBuilder = (stage: Container) => {
  return new StageBuilderConcrete(stage)
}

export type StageBuilder = ReturnType<typeof createStageBuilder>