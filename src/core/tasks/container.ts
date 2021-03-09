import * as PIXI from 'pixi.js'
import {Task} from "./"
import {Thing} from '../things'

abstract class ContainerTask<T> implements Task<T> {
    public abstract execute(): Promise<T>;
}

class MountThingsToContainer extends ContainerTask<PIXI.Container> {
    private readonly _things: Array<Thing>
    private readonly _container: PIXI.Container

    constructor(container: PIXI.Container, things: Array<Thing>) {
        super()
        this._things = things
        this._container = container
    }

    public async execute(): Promise<PIXI.Container> {
        return await new Promise<PIXI.Container>(resolve => {
            this._container.addChild(...this._things)
            resolve(this._container)
        })
    }
}

class UnMountThingsFromContainer extends ContainerTask<Array<Thing>> {
    private readonly _container: PIXI.Container

    constructor(container: PIXI.Container) {
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


