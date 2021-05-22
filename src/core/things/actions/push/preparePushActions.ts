import {EmptyInstruction, Instruction} from '@/core/instructions';
import {Direction} from '@/core/types/things';
import move from '@/core/instructions/move';
import {Thing} from '@/core/things';
import {RuleController} from '@/core/observer/rule';
import {MapController} from '@/core/observer/map';
import {ThingController} from '@/core/observer';

export const preparePushActions = (subject: Thing, ruleController: RuleController, mapController: MapController, thingController: ThingController, visitorFrom: Direction): void => {
    let newInstruction: Instruction
    switch (visitorFrom) {
        case Direction.TOP:
            newInstruction = new move.MoveDownInstruction(subject, ruleController, mapController)
            break
        case Direction.DOWN:
            newInstruction = new move.MoveUpInstruction(subject, ruleController, mapController)
            break
        case Direction.LEFT:
            newInstruction = new move.MoveRightInstruction(subject, ruleController, mapController)
            break
        case Direction.RIGHT:
            newInstruction = new move.MoveLeftInstruction(subject, ruleController, mapController)
            break
        default:
            newInstruction = new EmptyInstruction(subject, ruleController, mapController)
            break
    }
    // thingController.pushInstruction(newInstruction)
    thingController.addNewInstruction(newInstruction)
    thingController.pushInstructions()
}