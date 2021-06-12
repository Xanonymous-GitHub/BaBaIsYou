import { Thing } from '@/core/things'
import { RuleController } from '@/core/controllers/rule'
import { PropertyType } from '@/core/types/properties'
import { MapController, MapUpdateSituation } from '@/core/controllers/map'
import { ThingController } from '@/core/controllers/thing'
import { DisappearInstruction } from '@/core/instructions/existence'

export const prepareSinkActions = async (subject: Thing, visitor: Thing, thingController: ThingController) => {
  const subjectIsFloat = thingController.store.getRuleController().$is(subject, PropertyType.FLOAT)
  const visitorIsFloat = thingController.store.getRuleController().$is(visitor, PropertyType.FLOAT)

  // activate sink if subject and visitor are in the same layer
  if (subjectIsFloat === visitorIsFloat) {
    // remove both subject and visitor from map
    const removeSubjectInstruction = new DisappearInstruction(subject, thingController.store)
    const removeVisitorInstruction = new DisappearInstruction(visitor, thingController.store)
    removeSubjectInstruction.setPriority(9999999990001)
    removeVisitorInstruction.setPriority(9999999990001)
    thingController.addNewInstruction(removeSubjectInstruction)
    thingController.addNewInstruction(removeVisitorInstruction)
    thingController.pushInstructions()
  }
}