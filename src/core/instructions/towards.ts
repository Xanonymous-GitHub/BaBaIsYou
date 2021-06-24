import { RawInstruction } from '@/core/instructions/index'
import type { Thing } from '@/core/things'
import type { Direction } from '@/core/types/things'
import { reverseDirection } from '@/core/utils/direction'

export class UpdateTowardsInstruction extends RawInstruction {
  private readonly _towards!: Direction

  constructor(subject: Thing, towards: Direction) {
    super(subject)
    this._towards = towards
  }

  public async perform(): Promise<void> {
    this._subject.updateTowards(this._towards)
  }

  public async unperform(): Promise<void> {
    this._subject.updateTowards(reverseDirection(this._towards))
  }
}