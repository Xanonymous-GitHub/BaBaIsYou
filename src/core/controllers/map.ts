import { Direction } from '@/core/types/things'
import type { Thing } from '@/core/things'
import type { Edge } from '@/core/store/services/screen'
import type { Option, Some } from 'fp-ts/es6/Option'
import { isNone, isSome, none, some } from 'fp-ts/es6/Option'
import type { ThingType } from '@/core/types'
import type { FeatureCondition } from '@/core/controllers/rule'
import { TransformInstruction } from '@/core/instructions/transform'
import { PropertyType } from '@/core/types/properties'
import {
  MoveDownInstruction,
  MoveLeftInstruction,
  MoveRightInstruction,
  MoveUpInstruction
} from '@/core/instructions/move'
import { EmptyInstruction } from '@/core/instructions'
import { reverseDirection } from '@/core/utils/direction'

export enum MapUpdateSituation {
  UP = 'up',
  DOWN = 'down',
  RIGHT = 'right',
  LEFT = 'left',
  APPEAR = 'appear',
  DISAPPEAR = 'disappear'
}

export interface Neighbor {
  up: Option<Array<Readonly<Thing>>>
  down: Option<Array<Readonly<Thing>>>
  left: Option<Array<Readonly<Thing>>>
  right: Option<Array<Readonly<Thing>>>
}

export interface MapController {
  canIEncounter: (subject: Thing, direction: Direction) => Promise<boolean>
  update: (subject: Thing, situation: MapUpdateSituation) => Promise<void>
  notifyBeside: (subject: Thing, notifyDirections: Array<Direction>) => Promise<void>
  notifyLeave: (subject: Thing, notifyDirections: Array<Direction>) => Promise<void>
  whoAreThere: (x: number, y: number) => Option<Array<Readonly<Thing>>>
  whoNearMe: (subject: Thing) => Neighbor
  appendTransformInstructions: (changeFeatures: Map<ThingType, Array<FeatureCondition>>) => Promise<void>
  processMoveInstructions: (moveFeatures: Map<ThingType, Array<FeatureCondition>>) => Promise<void>
  clean: () => void
  changeMapSize: (mapEdge: Edge) => void
}

class MapControllerConcrete implements MapController {
  private _gameMap: Array<Array<Option<Array<Thing>>>>
  private maxX: number
  private maxY: number

  constructor() {
    // initial map size is 1 block.
    this.maxX = 0
    this.maxY = 0

    // construct map from map size
    this._gameMap = new Array<Array<Option<Array<Thing>>>>(this.maxX + 1)
    for (let x = 0; x <= this.maxX; x++) {
      this._gameMap[x] = new Array<Option<Array<Thing>>>(this.maxY + 1)
    }

    // init map value
    this._resetMap()
  }

  private _resetMap(): void {
    for (let x = 0; x <= this.maxX; x++) {
      for (let y = 0; y <= this.maxY; y++) {
        this._gameMap[x][y] = none
      }
    }
  }

  private _placeToPosition(x: number, y: number, subject: Thing): void {
    if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
    if (isNone(this._gameMap[x][y])) this._gameMap[x][y] = some([subject])
    else if (isSome(this._gameMap[x][y])) (this._gameMap[x][y] as Some<Array<Thing>>).value.push(subject)
    else throw new Error(`Map system error, pos @ x:${x} y:${y} is invalid type!`)
  }

  private _removeFromPosition(x: number, y: number, subject: Thing): void {
    if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
    if (isSome(this._gameMap[x][y])) {
      const pos = (this._gameMap[x][y] as Some<Array<Thing>>).value.findIndex(thing => thing.id === subject.id)
      if (pos === -1) throw new Error(`Thing ${subject.id} name = ${subject.name} is not in the pos @ x:${x} y:${y}, can't be removed!`);
      (this._gameMap[x][y] as Some<Array<Thing>>).value.splice(pos, 1)
    } else throw new Error(`Map system error, pos @ x:${x} y:${y} is invalid type!`)
  }

  public async canIEncounter(requester: Thing, direction: Direction): Promise<boolean> {
    const x = requester.blockX
    const y = requester.blockY

    switch (direction) {
      case Direction.UNDEFINED:
        return false

      case Direction.LEFT:
        if (requester.atLeftEdge()) return false
        if (isNone(this._gameMap[x - 1][y])) return true
        return (await Promise.all(
          (this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.RIGHT))
        )).reduce((previousResult: boolean, currentResult: boolean) => previousResult && currentResult, true)

      case Direction.RIGHT:
        if (requester.atRightEdge()) return false
        if (isNone(this._gameMap[x + 1][y])) return true
        return (await Promise.all(
          (this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.LEFT))
        )).reduce((previousResult: boolean, currentResult: boolean) => previousResult && currentResult, true)

      case Direction.TOP:
        if (requester.atTopEdge()) return false
        if (isNone(this._gameMap[x][y - 1])) return true
        return (await Promise.all(
          (this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.DOWN))
        )).reduce((previousResult: boolean, currentResult: boolean) => previousResult && currentResult, true)

      case Direction.DOWN:
        if (requester.atBottomEdge()) return false
        if (isNone(this._gameMap[x][y + 1])) return true
        return (await Promise.all(
          (this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleEncounter(requester, Direction.TOP))
        )).reduce((previousResult: boolean, currentResult: boolean) => previousResult && currentResult, true)
    }
  }

  public async notifyBeside(subject: Thing, notifyDirections: Array<Direction>): Promise<void> {
    const x = subject.blockX
    const y = subject.blockY

    await Promise.allSettled(
      notifyDirections.map((direction: Direction): PromiseLike<any> => {
        switch (direction) {
          case Direction.UNDEFINED:
            return Promise.resolve()

          case Direction.LEFT:
            if (subject.atLeftEdge() || isNone(this._gameMap[x - 1][y])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.RIGHT)))

          case Direction.RIGHT:
            if (subject.atRightEdge() || isNone(this._gameMap[x + 1][y])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.LEFT)))

          case Direction.TOP:
            if (subject.atTopEdge() || isNone(this._gameMap[x][y - 1])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.DOWN)))

          case Direction.DOWN:
            if (subject.atBottomEdge() || isNone(this._gameMap[x][y + 1])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleBeside(subject, Direction.TOP)))
        }
      })
    )
  }

  public async notifyLeave(subject: Thing, notifyDirections: Array<Direction>): Promise<void> {
    const x = subject.blockX
    const y = subject.blockY

    await Promise.allSettled(
      notifyDirections.map((direction: Direction): PromiseLike<any> => {
        switch (direction) {
          case Direction.UNDEFINED:
            return Promise.resolve()

          case Direction.LEFT:
            if (subject.atLeftEdge() || isNone(this._gameMap[x - 1][y])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x - 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.RIGHT)))

          case Direction.RIGHT:
            if (subject.atRightEdge() || isNone(this._gameMap[x + 1][y])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x + 1][y] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.LEFT)))

          case Direction.TOP:
            if (subject.atTopEdge() || isNone(this._gameMap[x][y - 1])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x][y - 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.DOWN)))

          case Direction.DOWN:
            if (subject.atBottomEdge() || isNone(this._gameMap[x][y + 1])) return Promise.resolve()
            return Promise.allSettled((this._gameMap[x][y + 1] as Some<Array<Thing>>).value.map(neighbor => neighbor.handleLeave(subject, Direction.TOP)))
        }
      })
    )
  }

  // this function will be called after an instruction has been performed.
  public async update(subject: Thing, happenedSituation: MapUpdateSituation): Promise<void> {
    const x = subject.blockX
    const y = subject.blockY

    switch (happenedSituation) {
      case MapUpdateSituation.APPEAR:
        this._placeToPosition(x, y, subject)
        break

      case MapUpdateSituation.DISAPPEAR:
        this._removeFromPosition(x, y, subject)
        break

      case MapUpdateSituation.UP:
        this._removeFromPosition(x, y + 1, subject)
        this._placeToPosition(x, y, subject)
        break

      case MapUpdateSituation.DOWN:
        this._removeFromPosition(x, y - 1, subject)
        this._placeToPosition(x, y, subject)
        break

      case MapUpdateSituation.LEFT:
        this._removeFromPosition(x + 1, y, subject)
        this._placeToPosition(x, y, subject)
        break

      case MapUpdateSituation.RIGHT:
        this._removeFromPosition(x - 1, y, subject)
        this._placeToPosition(x, y, subject)
        break
    }
  }

  public async appendTransformInstructions(changeFeatures: Map<ThingType, Array<FeatureCondition>>): Promise<void> {
    for (let x = 0; x <= this.maxX; x++) {
      for (let y = 0; y <= this.maxY; y++) {
        const block = this._gameMap[x][y]
        if (isNone(block)) continue

        for (const thing of block.value) {
          // get conditions of thing
          const conditions = changeFeatures.get(thing.name as ThingType)
          if (!conditions) continue
          if (conditions.length === 0) continue

          // push transform instructions
          const transformInstruction = new TransformInstruction(thing)
          for (const condition of conditions) {
            transformInstruction.addTransformName(condition.feature)
          }
          transformInstruction.setPriority(9999999990002)
          thing.thingController.addNewInstruction(transformInstruction)
          thing.thingController.pushInstructions()
        }
      }
    }
  }

  public async processMoveInstructions(moveFeatures: Map<ThingType, Array<FeatureCondition>>): Promise<void> {
    for (let x = 0; x <= this.maxX; x++) {
      for (let y = 0; y <= this.maxY; y++) {
        const block = this._gameMap[x][y]
        if (isNone(block)) continue

        for (const thing of block.value) {
          // get conditions of thing
          const conditions = moveFeatures.get(thing.name as ThingType)
          if (!conditions) continue
          if (conditions.length === 0) continue

          for (const condition of conditions) {
            if (condition.feature === PropertyType.MOVE) {
              const appendMoveInstruction = (thing: Thing) => {
                let instruction
                switch (thing.towards) {
                  case Direction.TOP:
                    instruction = new MoveUpInstruction(thing)
                    break
                  case Direction.DOWN:
                    instruction = new MoveDownInstruction(thing)
                    break
                  case Direction.RIGHT:
                    instruction = new MoveRightInstruction(thing)
                    break
                  case Direction.LEFT:
                    instruction = new MoveLeftInstruction(thing)
                    break
                  default:
                    instruction = new EmptyInstruction(thing)
                }
                instruction.setPriority(9999999990001)
                thing.thingController.addNewInstruction(instruction)
                thing.thingController.pushInstructions()
              }

              if (await this.canIEncounter(thing, thing.towards)) {
                await appendMoveInstruction(thing)
              } else if (await this.canIEncounter(thing, reverseDirection(thing.towards))) {
                await thing.reverseTowards()
                await appendMoveInstruction(thing)
              }
            }
          }
        }
      }
    }
  }

  public clean(): void {
    this._resetMap()
  }

  public whoAreThere(x: number, y: number): Option<Array<Readonly<Thing>>> {
    if (x < 0 || x > this.maxX || y < 0 || y > this.maxY) throw new Error(`Map system error, pos @ x:${x} y:${y} is out of range!`)
    return this._gameMap[x][y]
  }

  public whoNearMe(subject: Thing): Neighbor {
    const x = subject.blockX
    const y = subject.blockY

    const up = subject.atTopEdge() ? none : this._gameMap[x][y - 1]
    const down = subject.atBottomEdge() ? none : this._gameMap[x][y + 1]
    const left = subject.atLeftEdge() ? none : this._gameMap[x - 1][y]
    const right = subject.atRightEdge() ? none : this._gameMap[x + 1][y]

    return { up, down, left, right }
  }

  public changeMapSize(mapEdge: Edge) {
    // get map size
    this.maxX = mapEdge.maxX
    this.maxY = mapEdge.maxY

    // construct map from map size
    this._gameMap = new Array<Array<Option<Array<Thing>>>>(this.maxX + 1)
    for (let x = 0; x <= this.maxX; x++) {
      this._gameMap[x] = new Array<Option<Array<Thing>>>(this.maxY + 1)
    }

    this.clean()
  }
}

export const createMapController = (): MapController => {
  return new MapControllerConcrete()
}
