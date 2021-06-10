import { Thing } from '../things'
import { getUid } from '@/core/utils/uuid'
import { RuleController } from '@/core/observer/rule'
import { MapController } from '@/core/observer/map'

export interface Instruction {
  perform: () => Promise<void>
  setPriority: (priority: number) => void
  getPriority: () => number | undefined
}

export abstract class RawInstruction implements Instruction {
  private readonly _id: string
  protected readonly _subject: Thing
  protected readonly _ruleController: RuleController
  protected readonly _mapController: MapController
  private _priority?: number

  constructor(subject: Thing, ruleController: RuleController, mapController: MapController) {
    this._id = getUid()
    this._subject = subject
    this._ruleController = ruleController
    this._mapController = mapController
  }

  public abstract perform(): Promise<void>

  public setPriority(priority: number): void {
    this._priority = priority
  }

  public getPriority(): number | undefined {
    return this._priority
  }
}

export class EmptyInstruction extends RawInstruction {
  public async perform() {
    return
  }
}