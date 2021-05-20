import {Thing} from '@/core/things';
import {ThingController} from '@/core/observer';
import {RuleController} from '@/core/observer/rule';
import {PropertyType} from '@/core/types/properties';
import {MapController, MapUpdateSituation} from '@/core/observer/map';

export const prepareSinkActions = (visitor: Thing, ruleController: RuleController, thingController: ThingController, mapController: MapController) => {
    const subjectIsFloat = false // issue: how to get subject?
    const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

    // activate sink if subject and visitor are in the same layer
    if (subjectIsFloat === visitorIsFloat){
        thingController.stopDispatcher()

        // remove visiting SINK thing from map
        mapController.update(visitor, MapUpdateSituation.DISAPPEAR)

        // remove subject
        // issue: how to get subject?

        // DEBUG
        console.log('you die!')
    }
}