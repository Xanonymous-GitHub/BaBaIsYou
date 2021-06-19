import type { SceneSetup } from '@/core/types'
import { Container } from 'pixi.js'
import { isNone } from 'fp-ts/es6/Option'
import type { SpriteController } from './sprite'
import { MountThingsToContainerTask, UnMountThingFromContainerTask } from '@/core/builders/tasks/container'
import type { Thing } from '@/core/things'
import { store } from '@/core'

export class ContainerBuilderConcrete {
  private readonly _spriteController: SpriteController
  public gameScene: Readonly<Container> = new Container()

  constructor() {
    this._spriteController = store.getSpriteBuilder()
  }

  public async createEmptyScene(): Promise<Readonly<Container>> {
    // find if there has any empty container.
    const emptyContainerOption = store.getEmptyContainer()
    if (isNone(emptyContainerOption)) {
      return new Container()
    }
    return emptyContainerOption.value
  }

  public async createGameScene(sceneSetup: SceneSetup): Promise<Readonly<Container>> {
    const sceneContainer = await this.createEmptyScene()
    // call sprite controller to make all elements that needed.
    const things = await (this._spriteController.getThings(sceneSetup.thingsMap))

    // bind receiver to receive commands.
    await this._spriteController.connectThingsToThingController(things)

    // set initial rules.
    store.getScanner().findRulesFromMap(store.getAppEdge())

    // mount things to the container.
    const mountTask = new MountThingsToContainerTask()
    mountTask.setArgs(sceneContainer, things)
    await mountTask.execute()

    this.gameScene = sceneContainer

    return sceneContainer
  }

  public async removeThingFromGameScene(target: Thing) {
    const removeTask = new UnMountThingFromContainerTask()
    removeTask.setArgs(target, this.gameScene)
    await removeTask.execute()
  }
}

export const createContainerBuilder = () => {
  return new ContainerBuilderConcrete()
}

export type ContainerBuilder = ReturnType<typeof createContainerBuilder>