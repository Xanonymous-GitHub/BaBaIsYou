import type { Thing } from '../things'
import { getUid } from '@/core/utils/uuid'

export interface Instruction {
  perform: () => Promise<void>
  setPriority: (priority: number) => void
  getPriority: () => number | undefined
}

export abstract class RawInstruction implements Instruction {
  private readonly _id: string
  protected readonly _subject: Thing
  private _priority?: number

  constructor(subject: Thing) {
    this._id = getUid()
    this._subject = subject
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
  public override async perform() {
    return
  }
}