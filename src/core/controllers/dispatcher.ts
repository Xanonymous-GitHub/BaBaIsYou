import { ObservableSubject } from '../observer/observable'
import { isNone, isSome, none, some } from 'fp-ts/es6/Option'
import type { Option } from 'fp-ts/es6/Option'
import type { Instruction } from '@/core/instructions'
import PriorityQueue from '@/core/data-structures/priorityQueue'
import type { Observer } from '@/core/observer/observer'
import { getUid } from '@/core/utils/uuid'
import { store } from '@/core'
import { youGone } from '@/core/game'


export class InstructionDispatchServerConcrete extends ObservableSubject {
  private _runningCommand = false
  private _isActive = false
  private _pendingInstructions: PriorityQueue<Instruction>
  private _needScanRule = false
  private _existYou = true

  public commandListener: Observer

  constructor() {
    super()
    this._pendingInstructions = new PriorityQueue<Instruction>()
    this.commandListener = {
      observeId: getUid(),
      update: async () => {
        await this._run()
      }
    }
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

  private async _executeInstructions() {
    let currentInstruction = this._nextInstruction()
    while (isSome(currentInstruction)) {
      await currentInstruction.value.perform()
      currentInstruction = this._nextInstruction()
    }
  }

  private async _run() {
    const nextCommand = store.nextCommand()
    if (!this._isActive || this._runningCommand) return
    if (isNone(nextCommand)) return

    this._setRunning()
    this.setChanged()
    await this.notifyObservers(nextCommand.value)
    await this._executeInstructions()

    if (this._needScanRule) {
      store.getRuleController().refreshAll()
      store.getScanner().findRulesFromMap(store.getAppEdge())
      await store.getRuleController().processImmediateChanges()
      this._needScanRule = false
    }

    await this._executeInstructions()
    const existYou = await store.getRuleController().checkYouExistsInLevel()
    if (existYou !== this._existYou) {
      this._existYou = existYou
      setTimeout(() => {
        youGone(this._existYou)
      }, 2000)
    }
    this._setNotRunning()
  }
}

export type InstructionDispatchServer = InstructionDispatchServerConcrete

export const createInstructionDispatchServer = () => {
  return new InstructionDispatchServerConcrete()
}

