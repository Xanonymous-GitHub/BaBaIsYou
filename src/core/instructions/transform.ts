import { RawInstruction } from '@/core/instructions/index'
import { ThingType } from '@/core/types'
import { none, Option, some, isNone, isSome } from 'fp-ts/es6/Option'
import { store } from '@/core'

export class TransformInstruction extends RawInstruction {
  private _newNames: Option<Array<ThingType>> = none

  public addTransformName(name: ThingType): void {
    if (isSome(this._newNames)) {
      this._newNames.value.push(name)
    } else {
      this._newNames = some([name])
    }
  }

  public async perform() {
    console.log('perform transform instruction')

    // ignore if instructions does not contain new names
    if (isNone(this._newNames)) return

    // cannot change 1 thing to multiple things yet, so we ignore instruction
    if (this._newNames.value.length > 1) return

    // change subject name
    this._subject.name = this._newNames.value[0]

    // change subject texture
    const newTexture = store.getTextureByName(this._newNames.value[0])
    if (isNone(newTexture)) throw new Error(`texture with name ${this._newNames.value[0]} does not exist`)
    this._subject.texture = newTexture.value
  }
}