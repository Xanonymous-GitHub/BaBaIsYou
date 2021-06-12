import { EmptyInstruction, Instruction } from '@/core/instructions'
import { Direction } from '@/core/types/things'
import move from '@/core/instructions/move'
import { Thing } from '@/core/things'
import { ThingController } from '@/core/observer'

export const preparePushActions = (subject: Thing, visitorFrom: Direction, thingController: ThingController): void => {
  let newInstruction: Instruction
  switch (visitorFrom) {
    case Direction.TOP:
      newInstruction = new move.MoveDownInstruction(subject, thingController.store)
      break
    case Direction.DOWN:
      newInstruction = new move.MoveUpInstruction(subject, thingController.store)
      break
    case Direction.LEFT:
      newInstruction = new move.MoveRightInstruction(subject, thingController.store)
      break
    case Direction.RIGHT:
      newInstruction = new move.MoveLeftInstruction(subject, thingController.store)
      break
    default:
      newInstruction = new EmptyInstruction(subject, thingController.store)
      break
  }
  // thingController.pushInstruction(newInstruction)
  thingController.addNewInstruction(newInstruction)
  thingController.pushInstructions()
}