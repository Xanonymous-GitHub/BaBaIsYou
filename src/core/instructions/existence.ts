import { RawInstruction } from '@/core/instructions/index'
import { MapUpdateSituation } from '@/core/controllers/map'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import { store } from '@/core'

export class DisappearInstruction extends RawInstruction {
  public async perform() {
    // wait until the subject has already encountered.
    await new Promise<void>(resolve => setTimeout(() => resolve(), THING_MOVE_DURATION))

    // stop subject's controller
    this._subject.thingController.disconnect()

    // remove subject from map controller.
    await store.getMapController().update(this._subject, MapUpdateSituation.DISAPPEAR)

    // remove subject from game container.
    await store.getContainerBuilder().removeThingFromGameScene(this._subject)
  }
}