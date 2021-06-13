import { GameStore } from '@/core/store'
import { Thing } from '@/core/things'
import { Observer } from '@/core/observer/observer'
import { EmptyInstruction, Instruction } from '@/core/instructions'
import { getUid } from '@/core/utils/uuid'
import { MapUpdateSituation } from '@/core/controllers/map'
import { Observable } from '@/core/observer/observable'
import { Command, CommandType } from '@/core/store/services/command'
import { PropertyType } from '@/core/types/properties'
import { Direction } from '@/core/types/things'
import move from '@/core/instructions/move'

class ThingControllerConcrete implements Observer {
  public observeId: string
  private _instructions: Array<Instruction>
  public readonly store: GameStore
  private readonly _thing: Thing

  constructor(store: GameStore, thing: Thing) {
    // generate observerId (uuid) for the Thing.
    this.observeId = getUid()

    // init instructions array
    this._instructions = []

    // get store reference
    this.store = store

    // save the Observable target and register self in for command notifications.
    this.store.getDispatchServer().addObserver(this)

    // store the thing
    this._thing = thing

    // reverse binding
    this._thing.bindThingController(this)

    // put thing to map
    this.store.getMapController().update(this._thing, MapUpdateSituation.APPEAR).then()
  }

  public clearInstructions() {
    this._instructions = []
  }

  public addNewInstruction(instruction: Instruction) {
    this._instructions.push(instruction)
  }

  public pushInstructions() {
    this.store.getDispatchServer().addInstructions(this._instructions)
    this.clearInstructions()
  }

  public async update(subject: Observable, command: Command): Promise<void> {
    // 1. when received a command, ask ruleController if self has privilege to execute this command. (am I 'YOU'?)
    const isYou =
      this.store.getRuleController().$is(this._thing, PropertyType.YOU) ||
      this.store.getRuleController().$is(this._thing, PropertyType.YOU2)
    if (!isYou) return

    // 2. if could, check if there leaves any obstacles to perform this command.
    const iCanEncounter = await this.store.getMapController().canIEncounter(this._thing, ((): Direction => {
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

    // 3. if not any obstacles, apply an self instruction to the DispatchServer.
    let newInstruction: Instruction
    switch (command.value) {
      case CommandType.UP:
        newInstruction = new move.MoveUpInstruction(this._thing, this.store)
        break
      case CommandType.DOWN:
        newInstruction = new move.MoveDownInstruction(this._thing, this.store)
        break
      case CommandType.LEFT:
        newInstruction = new move.MoveLeftInstruction(this._thing, this.store)
        break
      case CommandType.RIGHT:
        newInstruction = new move.MoveRightInstruction(this._thing, this.store)
        break
      default:
        newInstruction = new EmptyInstruction(this._thing, this.store)
        break
    }

    this.store.getDispatchServer().needScanRule()

    this.addNewInstruction(newInstruction)
    this.pushInstructions()
  }

  public stopDispatcher(): void {
    this.store.getDispatchServer().disableService()
  }

  public disconnect(): void {
    this.store.getDispatchServer().deleteObserver(this)
  }
}

export const createThingController = (store: GameStore, thing: Thing) => {
  return new ThingControllerConcrete(store, thing)
}
export type ThingController = ReturnType<typeof createThingController>