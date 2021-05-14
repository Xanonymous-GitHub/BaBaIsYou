import {Thing} from '@/core/things';
import {ThingController} from '@/core/observer';
import {RuleController} from '@/core/observer/rule';
import {PropertyType} from '@/core/types/properties';

export const prepareDefeatActions = (visitor: Thing, ruleController: RuleController, thingController: ThingController) => {
    if (ruleController.$is(visitor, PropertyType.YOU)){
        thingController.stopDispatcher()

        // DEBUG
        console.log('you die!')
    }
}