import type { Thing } from '@/core/things'
import type { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareDefeatActions = async (destroyed: Thing, thingController: ThingController) => {
  const removeInstruction = new DisappearInstruction(destroyed)
  removeInstruction.setPriority(9999999990001)
  thingController.addNewInstruction(removeInstruction)
  thingController.pushInstructions()
}