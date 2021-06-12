import { Thing } from '@/core/things'
import { Direction } from '@/core/types/things'
import { PropertyType } from '@/core/types/properties'
import {
  canBePushed,
  prepareDefeatActions,
  preparePushActions,
  prepareSinkActions,
  prepareWinActions
} from '@/core/things/actions'
import { ThingController } from '@/core/controllers/thing'

export const generalHandleEncounterMixin = async (subject: Thing, visitor: Thing, visitorFrom: Direction, thingController: ThingController): Promise<boolean> => {
  const result = true

  // handle STOP
  const isStop = thingController.store.getRuleController().$is(subject, PropertyType.STOP)
  if (isStop) return false

  // handle PUSH
  const isPush = thingController.store.getRuleController().$is(subject, PropertyType.PUSH)
  if (isPush) {
    if (await canBePushed(subject, thingController.store.getMapController(), visitorFrom)) {
      preparePushActions(subject, visitorFrom, thingController)
      return result
    } else {
      return false
    }
  }

  // handle WIN
  const isWin = thingController.store.getRuleController().$is(subject, PropertyType.WIN)
  if (isWin) {
    prepareWinActions(thingController)
    return result
  }

  // handle DEFEAT
  const isDefeat = thingController.store.getRuleController().$is(subject, PropertyType.DEFEAT)
  if (isDefeat) {
    await prepareDefeatActions(visitor, thingController.store.getRuleController(), thingController, thingController.store.getMapController())
    return result
  }

  // handle SINK
  const isSink = thingController.store.getRuleController().$is(subject, PropertyType.SINK)
  if (isSink) {
    await prepareSinkActions(subject, visitor, thingController.store.getRuleController(), thingController, thingController.store.getMapController())
    return result
  }
  return result
}