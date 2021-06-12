import { RawInstruction } from './'
import { Direction } from '@/core/types/things'
import { MapUpdateSituation } from '@/core/observer/map'

export class MoveUpInstruction extends RawInstruction {
  public async perform() {
    await this._store.getMapController().notifyLeave(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN
    ])
    await this._subject.moveUp()
    await this._store.getMapController().update(this._subject, MapUpdateSituation.UP)
    await this._store.getMapController().notifyBeside(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.TOP
    ])
  }
}

export class MoveDownInstruction extends RawInstruction {
  public async perform() {
    await this._store.getMapController().notifyLeave(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.TOP
    ])
    await this._subject.moveDown()
    await this._store.getMapController().update(this._subject, MapUpdateSituation.DOWN)
    await this._store.getMapController().notifyBeside(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN
    ])
  }
}

export class MoveLeftInstruction extends RawInstruction {
  public async perform() {
    await this._store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.RIGHT
    ])
    await this._subject.moveLeft()
    await this._store.getMapController().update(this._subject, MapUpdateSituation.LEFT)
    await this._store.getMapController().notifyBeside(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
  }
}

export class MoveRightInstruction extends RawInstruction {
  public async perform() {
    await this._store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
    await this._subject.moveRight()
    await this._store.getMapController().update(this._subject, MapUpdateSituation.RIGHT)
    await this._store.getMapController().notifyBeside(this._subject, [
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
