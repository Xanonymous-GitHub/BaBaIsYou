import { Container, Sprite } from 'pixi.js'
import { Task } from './index'
import { Thing } from '@/core/things'

abstract class ContainerTask<T> implements Task<T> {
  public abstract execute(): Promise<T>;

  public abstract setArgs(...args: any[]): void
}

export class MountThingsToContainerTask extends ContainerTask<Readonly<Container>> {
  private _things!: Array<Readonly<Thing>>
  private _container!: Readonly<Container>

  public setArgs(container: Readonly<Container>, things: Array<Readonly<Thing>>): void {
    this._things = things
    this._container = container
  }

  public async execute(): Promise<Readonly<Container>> {
    return await new Promise<Readonly<Container>>(resolve => {
      this._container.addChild(...(this._things as Array<Thing>))
      resolve(this._container)
    })
  }
}

export class UnMountThingFromContainerTask extends ContainerTask<Thing> {
  private _container!: Readonly<Container>
  private _target!: Sprite

  public setArgs(target: Sprite, container: Readonly<Container>): void {
    this._container = container
    this._target = target
  }

  public async execute(): Promise<Thing> {
    return await new Promise<Thing>(resolve => {
      const targetIndex = this._container.getChildIndex(this._target)
      const thing = this._container.removeChildAt(targetIndex) as Thing
      resolve(thing)
    })
  }
}


