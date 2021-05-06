import {Direction} from '../../../types/things';
import {reverseDirection} from '../../../utils/direction';
import {Thing} from '../../../things';
import {MapController} from '../../../observer/map';

export const canBePushed = async (subject: Thing, mapController: MapController, visitorFrom: Direction): Promise<boolean> => {
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