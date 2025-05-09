import type { Thing } from '@/core/things'
import type { Observer } from '@/core/observer/observer'
import type { Instruction } from '@/core/instructions'
import { EmptyInstruction } from '@/core/instructions'
import { getUid } from '@/core/utils/ulid'
import { MapUpdateSituation } from '@/core/controllers/map'
import type { Observable } from '@/core/observer/observable'
import type { Command } from '@/core/store/services/command'
import { CommandType } from '@/core/store/services/command'
import { PropertyType } from '@/core/types/properties'
import { Direction } from '@/core/types/things'
import move from '@/core/instructions/move'
import { store } from '@/core'
import { UpdateTowardsInstruction } from '@/core/instructions/towards'
import { Species } from '@/core/resource'

class ThingControllerConcrete implements Observer {
  public observeId: string
  private _instructions: Array<Instruction>
  private readonly _thing: Thing

  constructor(thing: Thing) {
    // generate observerId (uuid) for the Thing.
    this.observeId = getUid()

    // init instructions array
    this._instructions = []

    // save the Observable target and register self in for command notifications.
    store.getDispatchServer().addObserver(this)

    // store the thing
    this._thing = thing

    // reverse binding
    this._thing.bindThingController(this)

    // put thing to map
    store.getMapController().update(this._thing, MapUpdateSituation.APPEAR).then()
  }

  public clearInstructions() {
    this._instructions = []
  }

  public addNewInstruction(instruction: Instruction) {
    this._instructions.push(instruction)
  }

  public pushInstructions() {
    store.getDispatchServer().addInstructions(this._instructions)
    this.clearInstructions()
  }

  public async update(_: Observable, command: Command): Promise<void> {
    // 1. when received a command, ask ruleController if self has the privilege to execute this command. (am I 'YOU'?)
    const isYou =
      store.getRuleController().$is(this._thing, PropertyType.YOU) ||
      store.getRuleController().$is(this._thing, PropertyType.YOU2)
    if (!isYou) return

    // 2. if could, check if there leaves any obstacles to perform this command.
    const iCanEncounter = await store.getMapController().canIEncounter(this._thing, ((): Direction => {
      switch (command.value) {
        case CommandType.UP:
          return Direction.TOP
        case CommandType.DOWN:
          return Direction.DOWN
        case CommandType.LEFT:
          return Direction.LEFT
        case CommandType.RIGHT:
          return Direction.RIGHT
        default:
          return Direction.UNDEFINED
      }
    })())
    if (!iCanEncounter) return

    // 3. if not any obstacles, apply a self-instruction to the DispatchServer.
    let newInstruction: Instruction
    switch (command.value) {
      case CommandType.UP:
        newInstruction = new move.MoveUpInstruction(this._thing)
        if (this._thing.species === Species.CHARACTERS) {
          this.addNewInstruction(new UpdateTowardsInstruction(this._thing, Direction.TOP))
        }
        break
      case CommandType.DOWN:
        newInstruction = new move.MoveDownInstruction(this._thing)
        if (this._thing.species === Species.CHARACTERS) {
          this.addNewInstruction(new UpdateTowardsInstruction(this._thing, Direction.DOWN))
        }
        break
      case CommandType.LEFT:
        newInstruction = new move.MoveLeftInstruction(this._thing)
        if (this._thing.species === Species.CHARACTERS) {
          this.addNewInstruction(new UpdateTowardsInstruction(this._thing, Direction.LEFT))
        }
        break
      case CommandType.RIGHT:
        newInstruction = new move.MoveRightInstruction(this._thing)
        if (this._thing.species === Species.CHARACTERS) {
          this.addNewInstruction(new UpdateTowardsInstruction(this._thing, Direction.RIGHT))
        }
        break
      default:
        newInstruction = new EmptyInstruction(this._thing)
        break
    }

    store.getDispatchServer().needScanRule()

    this.addNewInstruction(newInstruction)
    this.pushInstructions()
  }

  public stopDispatcher(): void {
    store.getDispatchServer().disableService()
  }

  public disconnect(): void {
    store.getDispatchServer().deleteObserver(this)
  }
}

export const createThingController = (thing: Thing) => {
  return new ThingControllerConcrete(thing)
}
export type ThingController = ReturnType<typeof createThingController>