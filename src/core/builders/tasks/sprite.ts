import type { Texture } from 'pixi.js'
import type { Task } from './index'
import type { Thing } from '@/core/things'
import type { Direction } from '@/core/types/things'
import { ThingFactory } from '@/core/things/factory'
import type { Species } from '@/core/resource'
import { createThingController } from '@/core/controllers/thing'

abstract class SpriteTask<T> implements Task<T> {
  public abstract execute(): Promise<T>;

  public abstract setArgs(...args: any[]): void
}

export class CreateThingTask extends SpriteTask<Thing> {
  private _name!: string
  private _species!: Species
  private _texture!: Texture
  private _defaultBlockX!: number
  private _defaultBlockY!: number
  private _blockSize!: number
  private _maxBlockX!: number
  private _maxBlockY!: number
  private _defaultTowards?: Direction

  public setArgs(
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
  ) {
    this._name = name
    this._species = species
    this._texture = texture
    this._defaultBlockX = defaultBlockX
    this._defaultBlockY = defaultBlockY
    this._blockSize = blockSize
    this._maxBlockX = maxBlockX
    this._maxBlockY = maxBlockY
    this._defaultTowards = defaultTowards
  }

  public async execute(): Promise<Thing> {
    return await new Promise<Thing>((resolve, reject) => {
      const thing = new ThingFactory(this._species, this._name)
        .createInstance(
          this._name,
          this._species,
          this._texture,
          this._defaultBlockX,
          this._defaultBlockY,
          this._blockSize,
          this._maxBlockX,
          this._maxBlockY,
          this._defaultTowards
        )
      if (thing) {
        resolve(thing)
      }
      reject(thing)
    })
  }
}

export class connectThingControllerTask extends SpriteTask<void> {
  private _thing!: Thing

  public setArgs(thing: Thing): void {
    this._thing = thing
  }

  public async execute(): Promise<void> {
    return await new Promise<void>(resolve => {
      createThingController(
        this._thing
      )
      resolve()
    })
  }
}