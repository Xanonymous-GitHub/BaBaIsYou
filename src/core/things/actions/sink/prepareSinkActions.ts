import type { Thing } from '@/core/things'
import type { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareSinkActions = async (subject: Thing, visitor: Thing, thingController: ThingController) => {
  const removeSubjectInstruction = new DisappearInstruction(subject)
  const removeVisitorInstruction = new DisappearInstruction(visitor)
  removeSubjectInstruction.setPriority(9999999990001)
  removeVisitorInstruction.setPriority(9999999990001)

  thingController.addNewInstruction(removeSubjectInstruction)
  thingController.addNewInstruction(removeVisitorInstruction)
  thingController.pushInstructions()
}