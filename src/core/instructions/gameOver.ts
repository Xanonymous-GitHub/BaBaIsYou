import { RawInstruction } from '@/core/instructions/index'
import { gameOver } from '@/core/game'
import { GameResult } from '@/core/types'
import { THING_MOVE_DURATION } from '@/core/app/configs'
import { sleep } from '@/core/utils/time'

export class CongratulationInstruction extends RawInstruction {
  public override async perform() {
    // wait until the subject has already encountered.
    await sleep(THING_MOVE_DURATION)
    await gameOver!(GameResult.WIN)
  }

  public override async unperform() {
    // win cannot be unperformed
    return Promise.reject();
  }
}