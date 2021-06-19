import type { ThingController } from '@/core/controllers/thing'
import { CongratulationInstruction } from '@/core/instructions/gameOver'
import type { Thing } from '@/core/things'

export const prepareWinActions = (subject: Thing, thingController: ThingController) => {
  const winInstruction = new CongratulationInstruction(subject)
  winInstruction.setPriority(9999999999999)

  thingController.addNewInstruction(winInstruction)
  thingController.pushInstructions()
}