import {PropertyType} from '../../../types/properties';
import {Direction} from '../../../types/things';
import {reverseDirection} from '../../../utils/direction';
import {Thing} from '../../../things';
import {RuleController} from '../../../observer/rule';
import {MapController} from '../../../observer/map';

export const canBePushed = async (subject: Thing, ruleController: RuleController, mapController: MapController, visitorFrom: Direction): Promise<boolean> => {
    const isPush = ruleController.$is(subject, PropertyType.PUSH)
    if (!isPush) return false

    // edge detection
    switch (visitorFrom) {
        case Direction.DOWN:
            if (subject.atTopEdge()) return false
            break
        case Direction.TOP:
            if (subject.atBottomEdge()) return false
            break
        case Direction.RIGHT:
            if (subject.atLeftEdge()) return false
            break
        case Direction.LEFT:
            if (subject.atRightEdge()) return false
            break
    }

    // canLeave
    return await mapController.canIEncounter(subject, reverseDirection(visitorFrom))
}