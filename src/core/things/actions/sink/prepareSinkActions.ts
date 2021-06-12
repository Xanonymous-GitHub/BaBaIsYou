import { Thing } from '@/core/things'
import { RuleController } from '@/core/controllers/rule'
import { PropertyType } from '@/core/types/properties'
import { MapController, MapUpdateSituation } from '@/core/controllers/map'
import { ThingController } from '@/core/controllers/thing'

export const prepareSinkActions = async (subject: Thing, visitor: Thing, ruleController: RuleController, thingController: ThingController, mapController: MapController) => {
  const subjectIsFloat = ruleController.$is(subject, PropertyType.FLOAT)
  const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

  // activate sink if subject and visitor are in the same layer
  if (subjectIsFloat === visitorIsFloat) {
    // remove both subject and visitor from map
    await mapController.update(subject, MapUpdateSituation.DISAPPEAR)
    await mapController.update(visitor, MapUpdateSituation.DISAPPEAR)

    // DEBUG
    console.log('you die!')
  }
}