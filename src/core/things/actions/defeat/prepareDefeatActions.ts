import { Thing } from '@/core/things'
import { PropertyType } from '@/core/types/properties'
import { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareDefeatActions = async (destroyed: Thing, thingController: ThingController) => {
  const removeInstruction = new DisappearInstruction(destroyed, thingController.store)
  removeInstruction.setPriority(9999999990001)
  thingController.addNewInstruction(removeInstruction)
  thingController.pushInstructions()

}