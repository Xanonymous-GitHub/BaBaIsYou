import { RawInstruction } from '@/core/instructions/index'
import { MapUpdateSituation } from '@/core/controllers/map'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import { store } from '@/core'
import { sleep } from '@/core/utils/time'

export class DisappearInstruction extends RawInstruction {
  public override async perform() {
    // wait until the subject has already encountered.
    await sleep(THING_MOVE_DURATION)

    // stop subject's controller
    this._subject.thingController.disconnect()

    // remove subject from map controller.
    await store.getMapController().update(this._subject, MapUpdateSituation.DISAPPEAR)

    // remove subject from game container.
    await store.getContainerBuilder().removeThingFromGameScene(this._subject)
  }

  public override async unperform() {
    // wait until the subject has already encountered.
    await sleep(THING_MOVE_DURATION)

    // TODO: How to add thing back to game scene?

    // unperformed disappear in a map
    await store.getMapController().update(this._subject, MapUpdateSituation.APPEAR)

    // TODO: How to reconnect to Observer
  }
}