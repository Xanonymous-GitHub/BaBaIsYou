import { RawInstruction } from './'
import { Direction } from '@/core/types/things'
import { MapUpdateSituation } from '@/core/controllers/map'
import { store } from '@/core'

export class MoveUpInstruction extends RawInstruction {
  public async perform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN
    ])
    await this._subject.moveUp()
    await store.getMapController().update(this._subject, MapUpdateSituation.UP)
    await store.getMapController().notifyBeside(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.TOP
    ])
  }
}

export class MoveDownInstruction extends RawInstruction {
  public async perform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.TOP
    ])
    await this._subject.moveDown()
    await store.getMapController().update(this._subject, MapUpdateSituation.DOWN)
    await store.getMapController().notifyBeside(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN
    ])
  }
}

export class MoveLeftInstruction extends RawInstruction {
  public async perform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.RIGHT
    ])
    await this._subject.moveLeft()
    await store.getMapController().update(this._subject, MapUpdateSituation.LEFT)
    await store.getMapController().notifyBeside(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
  }
}

export class MoveRightInstruction extends RawInstruction {
  public async perform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
    await this._subject.moveRight()
    await store.getMapController().update(this._subject, MapUpdateSituation.RIGHT)
    await store.getMapController().notifyBeside(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.RIGHT
    ])
  }
}

export default {
  MoveUpInstruction,
  MoveDownInstruction,
  MoveLeftInstruction,
  MoveRightInstruction
}
