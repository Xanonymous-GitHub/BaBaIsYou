import type { Species } from '@/core/resource'
import type { Texture } from 'pixi.js'
import type { Direction } from '@/core/types/things'
import { Thing } from './'

export class ThingFactory {
  private readonly _species: Species
  private readonly _name: string

  constructor(species: Species, thingName: string) {
    this._species = species
    this._name = thingName
  }

  public createInstance(
    name: string,
    species: Species,
    textures: Array<Texture>,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
  ): Thing {
    return new Thing(name, species, textures, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)
  }
}