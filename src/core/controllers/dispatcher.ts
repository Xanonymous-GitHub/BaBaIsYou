import { ObservableSubject } from '../observer/observable'
import { GameStore } from '@/core/store'
import { isNone, isSome, none, Option, some } from 'fp-ts/es6/Option'
import { Instruction } from '@/core/instructions'
import PriorityQueue from '@/core/data-structures/priorityQueue'


export class InstructionDispatchServerConcrete extends ObservableSubject {
  private _store: GameStore
  private _runningCommand = false
  private _isActive = false
  private _pendingInstructions: PriorityQueue<Instruction>
  private _needScanRule = false
  private _win = false

  constructor(store: GameStore) {
    super()
    this._store = store
    this._pendingInstructions = new PriorityQueue<Instruction>()
  }

  private _setRunning() {
    this._runningCommand = true
  }

  private _setNotRunning() {
    this._runningCommand = false
  }

  public enableService() {
    this._isActive = true
  }

  public disableService() {
    this._isActive = false
  }

  private static _judgementInstructionPriority(instruction: Instruction): number {
    const instructionPriority = instruction.getPriority()
    if (!instructionPriority) return Date.now()
    return instructionPriority
  }

  public addInstructions(instructions: Array<Instruction>): void {
    for (const instruction of instructions) {
      const priority = InstructionDispatchServerConcrete._judgementInstructionPriority(instruction)
      this._pendingInstructions.add(instruction, priority)
    }
  }

  private _nextInstruction(): Option<Readonly<Instruction>> {
    const nextInstruction = this._pendingInstructions.poll()
    if (!nextInstruction) return none
    return some(nextInstruction)
  }

  public needScanRule() {
    this._needScanRule = true
  }

  private async addWinScene() {
    await this._store.getStageBuilder().addWinScene()
  }

  public win() {
    this._win = true
  }

  public run() {
    if (!this._isActive || this._runningCommand) return
    const nextCommand = this._store.nextCommand()
    if (isNone(nextCommand)) return
    this._setRunning()
    this.setChanged()
    this.notifyObservers(nextCommand.value)
      .then(() => {
        let currentInstruction = this._nextInstruction()
        while (isSome(currentInstruction)) {
          currentInstruction.value.perform().then()
          currentInstruction = this._nextInstruction()
        }
      })
      .then(() => {
        setTimeout(() => {
          if (this._needScanRule) {
            this._store.getRuleController().refreshAll()
            this._store.getScanner().findRulesFromMap(this._store.getAppEdge())
            this._needScanRule = false
          }
        }, 0)
        this._setNotRunning()
      })
    if (this._win) {
      this.addWinScene().then(
        () => this.disableService()
      )
    }
  }
}

export type InstructionDispatchServer = InstructionDispatchServerConcrete

export const createInstructionDispatchServer = (store: GameStore) => {
  return new InstructionDispatchServerConcrete(store)
}

