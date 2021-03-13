import {GameStore} from '../store';
import {Controller} from './';
import {SceneSetup} from '../types';
import {Container} from 'pixi.js'
import {isNone} from 'fp-ts/es6/Option';
import {SpriteController} from './sprite';
import {MountThingsToContainerTask} from '../tasks/container'

class ContainerControllerConcrete extends Controller {
    private readonly _spriteController: SpriteController

    constructor(store: GameStore, spriteController: SpriteController) {
        super(store)
        this._spriteController = spriteController
    }

    public async createScene(sceneSetup: SceneSetup): Promise<Readonly<Container>> {
        // find if there has any empty container.
        const emptyContainerOption = this._store.getEmptyContainer()
        let sceneContainer!: Readonly<Container>
        if (isNone(emptyContainerOption)) {
            sceneContainer = new Container()
        } else {
            sceneContainer = emptyContainerOption.value
        }

        // // give name to this container.
        // sceneContainer

        // call sprite controller to make all elements that needed.
        const things = await (this._spriteController.getThings(sceneSetup.thingsMap))

        // mount things to the container.
        const mountTask = new MountThingsToContainerTask()
        mountTask.setArgs(sceneContainer, things)
        await mountTask.execute()

        return sceneContainer
    }
}

export const createContainerController = (store: GameStore, spriteController: SpriteController) => {
    return new ContainerControllerConcrete(store, spriteController)
}

export type ContainerController = ReturnType<typeof createContainerController>