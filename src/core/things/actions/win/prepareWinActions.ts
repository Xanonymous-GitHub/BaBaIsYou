import { ThingController } from '@/core/controllers/thing'
import { CongratulationInstruction } from '@/core/instructions/gameOver'
import { Thing } from '@/core/things'

export const prepareWinActions = (subject: Thing, thingController: ThingController) => {
  const winInstruction = new CongratulationInstruction(subject, thingController.store)
  winInstruction.setPriority(9999999999999)

  thingController.addNewInstruction(winInstruction)
  thingController.pushInstructions()
}