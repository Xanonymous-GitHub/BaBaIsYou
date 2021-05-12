import {Thing} from '../../things';
import {Direction} from '../../types/things';
import {PropertyType} from '../../types/properties';
import {canBePushed, preparePushActions, prepareWinActions} from '../../things/actions';
import {RuleController} from '../../observer/rule';
import {MapController} from '../../observer/map';
import {ThingController} from '../../observer';

export const generalHandleEncounterMixin = async (subject: Thing, visitor: Thing, visitorFrom: Direction, ruleController: RuleController, mapController: MapController, thingController: ThingController): Promise<boolean> => {
    const result = true

    // handle STOP
    const isStop = ruleController.$is(subject, PropertyType.STOP)
    if (isStop) return false

    // handle PUSH
    const isPush = ruleController.$is(subject, PropertyType.PUSH)
    if (isPush) {
        if (await canBePushed(subject, mapController, visitorFrom)) {
            preparePushActions(subject, ruleController, mapController, thingController, visitorFrom)
            return result
        } else {
            return false
        }
    }

    // handle WIN
    const isWin = ruleController.$is(subject, PropertyType.WIN)
    if (isWin) {
        prepareWinActions(thingController)
    }

    return result
}