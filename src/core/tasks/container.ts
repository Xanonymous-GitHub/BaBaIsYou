import { Container } from 'pixi.js'
import { Task } from './'
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

export class UnMountThingsFromContainerTask extends ContainerTask<Array<Thing>> {
  private _container!: Readonly<Container>

  public setArgs(container: Readonly<Container>): void {
    this._container = container
  }

  public async execute(): Promise<Array<Thing>> {
    return await new Promise<Array<Thing>>(resolve => {
      const things = this._container.removeChildren() as Array<Thing>
      resolve(things)
    })
  }
}


