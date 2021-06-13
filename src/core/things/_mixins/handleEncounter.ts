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
  const ruleController = thingController.store.getRuleController()
  const mapController = thingController.store.getMapController()

  // get YOU property status
  const subjectIsYou = ruleController.$is(subject, PropertyType.YOU)
  const visitorIsYou = ruleController.$is(visitor, PropertyType.YOU)

  // get FLOAT property status
  const subjectIsFloat = ruleController.$is(subject, PropertyType.FLOAT)
  const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

  // handle STOP
  const isStop = ruleController.$is(subject, PropertyType.STOP)
  if (isStop) return false

  // handle WIN
  const isWin = ruleController.$is(subject, PropertyType.WIN)
  if (isWin) {
    if (subjectIsFloat === visitorIsFloat) {
      prepareWinActions(thingController)
      return result
    }
  }

  // handle PUSH
  const isPush = ruleController.$is(subject, PropertyType.PUSH)
  if (isPush) {
    if (await canBePushed(subject, mapController, visitorFrom)) {
      preparePushActions(subject, visitorFrom, thingController)
      return result
    }
    return false
  }

  // handle SINK
  const subjectIsSink = ruleController.$is(subject, PropertyType.SINK)
  const visitorIsSink = ruleController.$is(visitor, PropertyType.SINK)
  if (subjectIsFloat === visitorIsFloat) {
    if (subjectIsSink || visitorIsSink) {
      await prepareSinkActions(subject, visitor, thingController)
      return result
    }
  }

  // handle DEFEAT
  const subjectIsDefeat = ruleController.$is(subject, PropertyType.DEFEAT)
  const visitorIsDefeat = ruleController.$is(visitor, PropertyType.DEFEAT)
  if (subjectIsFloat === visitorIsFloat) {
    if (subjectIsDefeat && visitorIsYou) {
      await prepareDefeatActions(visitor, thingController)
    }
    if (visitorIsDefeat && subjectIsYou) {
      await prepareDefeatActions(subject, thingController)
    }
  }

  // encounter empty block
  return result
}