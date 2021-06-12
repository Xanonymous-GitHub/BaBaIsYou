import { Thing } from '../things'
import { getUid } from '@/core/utils/uuid'
import { GameStore } from '@/core/store'

export interface Instruction {
  perform: () => Promise<void>
  setPriority: (priority: number) => void
  getPriority: () => number | undefined
}

export abstract class RawInstruction implements Instruction {
  private readonly _id: string
  protected readonly _subject: Thing
  protected readonly _store: GameStore
  private _priority?: number

  constructor(subject: Thing, store: GameStore) {
    this._id = getUid()
    this._subject = subject
    this._store = store
    console.log('A')
    console.log(this._store)
    console.log('B')
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