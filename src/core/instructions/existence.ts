import { RawInstruction } from '@/core/instructions/index'
import { MapUpdateSituation } from '@/core/controllers/map'

export class DisappearInstruction extends RawInstruction {
  public async perform() {
    // stop subject's controller
    this._subject.thingController.disconnect()

    // remove subject from map controller.
    await this._store.getMapController().update(this._subject, MapUpdateSituation.DISAPPEAR)

    // remove subject from game container.
    await this._store.getContainerBuilder().removeThingFromGameScene(this._subject)
  }
}