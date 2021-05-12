import {Thing} from '../../../things';
import {ThingController} from '../../../observer';
import {RuleController} from '../../../observer/rule';
import {PropertyType} from '../../../types/properties';

export const prepareDefeatActions = (visitor: Thing, ruleController: RuleController, thingController: ThingController) => {
    if (ruleController.$is(visitor, PropertyType.YOU)){
        thingController.stopDispatcher()

        // DEBUG
        console.log('you die!')
    }
}