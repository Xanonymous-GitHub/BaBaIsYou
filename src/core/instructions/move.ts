import { RawInstruction } from './'
import { Direction } from '@/core/types/things'
import { MapUpdateSituation } from '@/core/controllers/map'
import { store } from '@/core'

export class MoveUpInstruction extends RawInstruction {
  public override async perform() {
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

  public override async unperform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.LEFT,
      Direction.RIGHT
    ])
    await store.getMapController().update(this._subject, MapUpdateSituation.DOWN)
    await this._subject.moveDown()
    await store.getMapController().notifyBeside(this._subject, [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN
    ])
  }
}

export class MoveDownInstruction extends RawInstruction {
  public override async perform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.RIGHT,
      Direction.LEFT
    ])
    await this._subject.moveDown()
    await store.getMapController().update(this._subject, MapUpdateSituation.DOWN)
    await store.getMapController().notifyBeside(this._subject, [
      Direction.DOWN,
      Direction.RIGHT,
      Direction.LEFT
    ])
  }

  public override async unperform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.RIGHT,
      Direction.LEFT
    ])
    await store.getMapController().update(this._subject, MapUpdateSituation.UP)
    await this._subject.moveUp()
    await store.getMapController().notifyBeside(this._subject, [
      Direction.DOWN,
      Direction.RIGHT,
      Direction.LEFT
    ])
  }
}

export class MoveLeftInstruction extends RawInstruction {
  public override async perform() {
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

  public override async unperform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
    await store.getMapController().update(this._subject, MapUpdateSituation.RIGHT)
    await this._subject.moveRight()
    await store.getMapController().notifyBeside(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.RIGHT
    ])
  }
}

export class MoveRightInstruction extends RawInstruction {
  public override async perform() {
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

  public override async unperform() {
    await store.getMapController().notifyLeave(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.RIGHT
    ])
    await store.getMapController().update(this._subject, MapUpdateSituation.LEFT)
    await this._subject.moveLeft()
    await store.getMapController().notifyBeside(this._subject, [
      Direction.TOP,
      Direction.DOWN,
      Direction.LEFT
    ])
  }
}

export default {
  MoveUpInstruction,
  MoveDownInstruction,
  MoveLeftInstruction,
  MoveRightInstruction
}
