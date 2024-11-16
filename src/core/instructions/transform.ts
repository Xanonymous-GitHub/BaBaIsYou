import { RawInstruction } from '@/core/instructions/index'
import type { ThingType } from '@/core/types'
import { none, some, isNone, isSome } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'
import { store } from '@/core'
import { convertNounToCharacter, getSpeciesByThingType } from '@/core/utils/thingType'
import type { NounType } from '@/core/types/nouns'
import { sleep } from '@/core/utils/time'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import { Thing } from '@/core/things'

export class TransformInstruction extends RawInstruction {
  private readonly _originalName: string
  private readonly _originalTexture
  private _thingTypes: Option<Array<ThingType>>

  constructor(subject: Thing) {
    super(subject);

    // save original data
    this._originalName = this._subject.thingName
    this._originalTexture = this._subject.texture

    // init ThingTypes
    this._thingTypes = none
  }

  public addTransformName(name: ThingType): void {
    if (isSome(this._thingTypes)) {
      this._thingTypes.value.push(name)
    } else {
      this._thingTypes = some([name])
    }
  }

  public override async perform() {
    // ignore if instructions do not contain new names
    if (isNone(this._thingTypes)) return

    // cannot change 1 thing to multiple things yet, so we ignore instruction
    if (this._thingTypes.value.length > 1) return

    // wait YOU finish move animations.
    await sleep(THING_MOVE_DURATION)

    // change subject name
    const thingType = convertNounToCharacter(this._thingTypes.value[0] as NounType)
    this._subject.thingName = thingType as string

    // change subject texture
    const species = getSpeciesByThingType(thingType)
    this._subject.textures = store.getAnimationTextures(species, this._subject.thingName)
  }

  public override async unperform() {
    // wait move instructions to finish
    await sleep(THING_MOVE_DURATION)

    // unperform subject texture
    this._subject.texture = this._originalTexture

    // unperform subject name
    this._subject.thingName = this._originalName

  }
}