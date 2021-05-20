import {Thing} from '@/core/things';
import {ThingController} from '@/core/observer';
import {RuleController} from '@/core/observer/rule';
import {PropertyType} from '@/core/types/properties';
import {MapController, MapUpdateSituation} from '@/core/observer/map';

export const prepareSinkActions = (subject: Thing, visitor: Thing, ruleController: RuleController, thingController: ThingController, mapController: MapController) => {
    const subjectIsFloat = ruleController.$is(subject, PropertyType.FLOAT)
    const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

    // activate sink if subject and visitor are in the same layer
    if (subjectIsFloat === visitorIsFloat) {
        // remove both subject and visitor from map
        mapController.update(subject, MapUpdateSituation.DISAPPEAR)
        mapController.update(visitor, MapUpdateSituation.DISAPPEAR)

        // DEBUG
        console.log('you die!')
    }
}