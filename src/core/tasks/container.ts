import {Container} from 'pixi.js'
import {Task} from './'
import {Thing} from '../things'

abstract class ContainerTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}

export class MountThingsToContainer extends ContainerTask<Container> {
    private readonly _things: Array<Thing>
    private readonly _container: Container

    constructor(container: Container, things: Array<Thing>) {
        super()
        this._things = things
        this._container = container
    }

    public async execute(): Promise<Container> {
        return await new Promise<Container>(resolve => {
            this._container.addChild(...this._things)
            resolve(this._container)
        })
    }
}

export class UnMountThingsFromContainer extends ContainerTask<Array<Thing>> {
    private readonly _container: Container

    constructor(container: Container) {
        super()
        this._container = container
    }

    public async execute(): Promise<Array<Thing>> {
        return await new Promise<Array<Thing>>(resolve => {
            const things = this._container.removeChildren() as Array<Thing>
            resolve(things)
        })
    }
}


