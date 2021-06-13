import { Thing } from '@/core/things'
import { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareSinkActions = async (subject: Thing, visitor: Thing, thingController: ThingController) => {
  const removeSubjectInstruction = new DisappearInstruction(subject, thingController.store)
  const removeVisitorInstruction = new DisappearInstruction(visitor, thingController.store)
  removeSubjectInstruction.setPriority(9999999990001)
  removeVisitorInstruction.setPriority(9999999990001)

  thingController.addNewInstruction(removeSubjectInstruction)
  thingController.addNewInstruction(removeVisitorInstruction)
  thingController.pushInstructions()
}