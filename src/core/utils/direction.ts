import { Direction } from '@/core/types/things'

export const reverseDirection = (originDirection: Direction): Direction => {
  if (originDirection === Direction.UNDEFINED) return originDirection
  return originDirection % 2 ? originDirection - 1 : originDirection + 1
}