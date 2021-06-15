import { Thing } from '@/core/things'
import { Direction } from '@/core/types/things'
import { PropertyType } from '@/core/types/properties'
import {
  canBePushed,
  preparePushActions,
  prepareWinActions,
  prepareSingleDestroyActions,
  prepareMutualDestroyActions
} from '@/core/things/actions'
import { ThingController } from '@/core/controllers/thing'
import { store } from '@/core'

export const generalHandleEncounterMixin = async (subject: Thing, visitor: Thing, visitorFrom: Direction, thingController: ThingController): Promise<boolean> => {
  const result = true
  const ruleController = store.getRuleController()
  const mapController = store.getMapController()

  // get YOU property status
  const subjectIsYou = ruleController.$is(subject, PropertyType.YOU) || ruleController.$is(subject, PropertyType.YOU2)
  const visitorIsYou = ruleController.$is(visitor, PropertyType.YOU) || ruleController.$is(visitor, PropertyType.YOU2)

  // get FLOAT property status
  const subjectIsFloat = ruleController.$is(subject, PropertyType.FLOAT)
  const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

  const isSameFloatStatus = Boolean(subjectIsFloat === visitorIsFloat)

  // handle WIN
  const isWin = ruleController.$is(subject, PropertyType.WIN)
  if (isWin && visitorIsYou) {
    if (subjectIsFloat === visitorIsFloat) {
      prepareWinActions(subject, thingController)
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

  // handle OPEN and SHUT
  const subjectIsOpen = ruleController.$is(subject, PropertyType.OPEN)
  const visitorIsOpen = ruleController.$is(visitor, PropertyType.OPEN)

  if (subjectIsOpen) {
    const visitorIsShut = ruleController.$is(visitor, PropertyType.SHUT)
    if (visitorIsShut) {
      await prepareMutualDestroyActions(subject, visitor, thingController)
      return result
    }
  }
  if (visitorIsOpen) {
    const subjectIsShut = ruleController.$is(subject, PropertyType.SHUT)
    if (subjectIsShut) {
      await prepareMutualDestroyActions(subject, visitor, thingController)
      return result
    }
  }

  // handle STOP
  const isStop = ruleController.$is(subject, PropertyType.STOP)
  if (isStop) return false

  // handle SINK
  if (isSameFloatStatus) {
    const subjectIsSink = ruleController.$is(subject, PropertyType.SINK)
    const visitorIsSink = ruleController.$is(visitor, PropertyType.SINK)

    if (subjectIsSink || visitorIsSink) {
      await prepareMutualDestroyActions(subject, visitor, thingController)
      return result
    }
  }

  // handle DEFEAT
  if (isSameFloatStatus) {
    const subjectIsDefeat = ruleController.$is(subject, PropertyType.DEFEAT)
    const visitorIsDefeat = ruleController.$is(visitor, PropertyType.DEFEAT)

    if (subjectIsDefeat && visitorIsYou) {
      await prepareSingleDestroyActions(visitor, thingController)
      return result
    }
    if (visitorIsDefeat && subjectIsYou) {
      await prepareSingleDestroyActions(subject, thingController)
      return result
    }
  }

  // handle HOT and MELT
  if (isSameFloatStatus) {
    const subjectIsHot = ruleController.$is(subject, PropertyType.HOT)
    const visitorIsHot = ruleController.$is(visitor, PropertyType.HOT)

    if (subjectIsHot) {
      const visitorIsMelt = ruleController.$is(visitor, PropertyType.MELT)
      if (visitorIsMelt) {
        await prepareSingleDestroyActions(visitor, thingController)
        return result
      }
    }
    if (visitorIsHot) {
      const subjectIsMelt = ruleController.$is(subject, PropertyType.MELT)
      if (subjectIsMelt) {
        await prepareSingleDestroyActions(subject, thingController)
        return result
      }
    }
  }

  // encounter empty block
  return result
}