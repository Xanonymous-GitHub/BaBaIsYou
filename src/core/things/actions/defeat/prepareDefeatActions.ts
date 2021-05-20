import {Thing} from '@/core/things';
import {ThingController} from '@/core/observer';
import {RuleController} from '@/core/observer/rule';
import {PropertyType} from '@/core/types/properties';
import {MapController, MapUpdateSituation} from '@/core/observer/map';

export const prepareDefeatActions = (visitor: Thing, ruleController: RuleController, thingController: ThingController, mapController: MapController) => {
    if (ruleController.$is(visitor, PropertyType.YOU)) {
        thingController.stopDispatcher()

        // remove visitor from map
        mapController.update(visitor, MapUpdateSituation.DISAPPEAR)

        // DEBUG
        console.log('you die!')
    }
}