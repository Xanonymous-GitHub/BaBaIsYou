import { RawInstruction } from '@/core/instructions/index'
import { ThingType } from '@/core/types'
import { none, Option, some, isNone, isSome } from 'fp-ts/es6/Option'
import { store } from '@/core'
import { convertNounToCharacter, getSpeciesByThingType } from '@/core/utils/thingType'
import { NounType } from '@/core/types/nouns'

export class TransformInstruction extends RawInstruction {
  private _thingTypes: Option<Array<ThingType>> = none

  public addTransformName(name: ThingType): void {
    if (isSome(this._thingTypes)) {
      this._thingTypes.value.push(name)
    } else {
      this._thingTypes = some([name])
    }
  }

  public async perform() {
    // ignore if instructions does not contain new names
    if (isNone(this._thingTypes)) return

    // cannot change 1 thing to multiple things yet, so we ignore instruction
    if (this._thingTypes.value.length > 1) return

    // change subject name
    const thingType = convertNounToCharacter(this._thingTypes.value[0] as NounType)
    this._subject.name = thingType as string

    // change subject texture
    const species = getSpeciesByThingType(thingType)
    await store.loadResourcesByName(species, [this._subject.name])
    const textureOption = store.getTextureByName(this._subject.name)
    if (isNone(textureOption)) throw new Error(`texture with name ${this._thingTypes.value[0]} does not exist`)
    this._subject.texture = textureOption.value
  }
}