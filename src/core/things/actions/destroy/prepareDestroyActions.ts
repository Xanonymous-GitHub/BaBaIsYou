import { Thing } from '@/core/things'
import { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareSingleDestroyActions = async (destroyed: Thing, thingController: ThingController) => {
  const removeInstruction = new DisappearInstruction(destroyed)
  removeInstruction.setPriority(9999999990001)
  thingController.addNewInstruction(removeInstruction)
  thingController.pushInstructions()
}

export const prepareMutualDestroyActions = async (subject: Thing, visitor: Thing, thingController: ThingController) => {
  const removeSubjectInstruction = new DisappearInstruction(subject)
  const removeVisitorInstruction = new DisappearInstruction(visitor)
  removeSubjectInstruction.setPriority(9999999990001)
  removeVisitorInstruction.setPriority(9999999990001)

  thingController.addNewInstruction(removeSubjectInstruction)
  thingController.addNewInstruction(removeVisitorInstruction)
  thingController.pushInstructions()
}