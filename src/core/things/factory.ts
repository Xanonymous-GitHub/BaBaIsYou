import { Species } from '@/core/resource'
import { Texture } from 'pixi.js'
import { Direction } from '@/core/types/things'
import { camelize } from '@/core/utils/string'
import characters from './character'
import nouns from './noun'
import operators from './operator'
import properties from './property'
import { Thing } from './'

export type ThingCreator = (
  name: string,
  species: Species,
  texture: Texture,
  defaultBlockX: number,
  defaultBlockY: number,
  blockSize: number,
  maxBlockX: number,
  maxBlockY: number,
  defaultTowards?: Direction
) => Thing

export class ThingFactory {
  private readonly _instanceFactor!: ThingCreator

  constructor(species: Species, thingName: string) {
    const classNameToInstantiate = camelize(thingName.trim())

    switch (species) {
      case Species.CHARACTERS:
        this._instanceFactor = characters[classNameToInstantiate]
        break
      case Species.NOUNS:
        this._instanceFactor = nouns[classNameToInstantiate]
        break
      case Species.OPERATORS:
        this._instanceFactor = operators[classNameToInstantiate]
        break
      case Species.PROPERTIES:
        this._instanceFactor = properties[classNameToInstantiate]
        break
    }
  }

  public createInstance(
    name: string,
    species: Species,
    texture: Texture,
    defaultBlockX: number,
    defaultBlockY: number,
    blockSize: number,
    maxBlockX: number,
    maxBlockY: number,
    defaultTowards?: Direction
  ): Thing {
    return this._instanceFactor(name, species, texture, defaultBlockX, defaultBlockY, blockSize, maxBlockX, maxBlockY, defaultTowards)
  }
}