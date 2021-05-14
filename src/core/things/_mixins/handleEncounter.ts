import {Thing} from '@/core/things';
import {Direction} from '@/core/types/things';
import {PropertyType} from '@/core/types/properties';
import {canBePushed, prepareDefeatActions, preparePushActions, prepareWinActions} from '@/core/things/actions';
import {RuleController} from '@/core/observer/rule';
import {MapController} from '@/core/observer/map';
import {ThingController} from '@/core/observer';

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

    // handle WIN & DEFEAT
    const isWin = ruleController.$is(subject, PropertyType.WIN)
    if (isWin) {
        prepareWinActions(thingController)
        return result
    }

    // const isDefeat = ruleController.$is(subject, PropertyType.DEFEAT)
    // if (isDefeat) {
    //     prepareDefeatActions(visitor, ruleController, thingController)
    //     return result
    // }

    return result
}