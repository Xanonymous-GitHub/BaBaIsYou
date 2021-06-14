import { EmptyInstruction, Instruction } from '@/core/instructions'
import { Direction } from '@/core/types/things'
import move from '@/core/instructions/move'
import { Thing } from '@/core/things'
import { ThingController } from '@/core/controllers/thing'

export const preparePushActions = (subject: Thing, visitorFrom: Direction, thingController: ThingController): void => {
  let newInstruction: Instruction
  switch (visitorFrom) {
    case Direction.TOP:
      newInstruction = new move.MoveDownInstruction(subject)
      break
    case Direction.DOWN:
      newInstruction = new move.MoveUpInstruction(subject)
      break
    case Direction.LEFT:
      newInstruction = new move.MoveRightInstruction(subject)
      break
    case Direction.RIGHT:
      newInstruction = new move.MoveLeftInstruction(subject)
      break
    default:
      newInstruction = new EmptyInstruction(subject)
      break
  }
  // thingController.pushInstruction(newInstruction)
  thingController.addNewInstruction(newInstruction)
  thingController.pushInstructions()
}