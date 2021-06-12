import { GameStore } from '@/core/store'
import { Builder } from './'
import { SceneSetup } from '@/core/types'
import { Container } from 'pixi.js'
import { isNone } from 'fp-ts/es6/Option'
import { SpriteController } from './sprite'
import { MountThingsToContainerTask, UnMountThingFromContainerTask } from '@/core/tasks/container'
import { createWinScreen } from '@/core/components/winScreen'
import { Thing } from '@/core/things'

export class ContainerBuilderConcrete extends Builder {
  private readonly _spriteController: SpriteController
  private _gameScene: Readonly<Container> = new Container()

  constructor(store: GameStore, spriteController: SpriteController) {
    super(store)
    this._spriteController = spriteController
  }

  public async createEmptyScene(): Promise<Readonly<Container>> {
    // find if there has any empty container.
    const emptyContainerOption = this._store.getEmptyContainer()
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
    await this._spriteController.connectThingsToThingController(
      this._store.getDispatchServer(),
      this._store.getRuleController(),
      this._store.getMapController(),
      things
    )

    // set initial rules.
    this._store.getScanner().findRulesFromMap(this._store.getAppEdge())

    // mount things to the container.
    const mountTask = new MountThingsToContainerTask()
    mountTask.setArgs(sceneContainer, things)
    await mountTask.execute()

    this._gameScene = sceneContainer

    return sceneContainer
  }

  public async createWinScene(): Promise<Readonly<Container>> {
    let winScene!: Readonly<Container>
    if (!this._store.hasContainerByName('win-scene')) {
      winScene = createWinScreen(this._store.getAppEdge())
    } else {
      winScene = this._store.getContainerByName('win-scene')
    }

    return winScene
  }

  public async removeThingFromGameScene(target: Thing) {
    const removeTask = new UnMountThingFromContainerTask()
    removeTask.setArgs(target, this._gameScene)
    await removeTask.execute()
  }
}

export const createContainerBuilder = (store: GameStore, spriteController: SpriteController) => {
  return new ContainerBuilderConcrete(store, spriteController)
}

export type ContainerController = ReturnType<typeof createContainerBuilder>