import type { Thing } from '@/core/things'
import { Direction } from '@/core/types/things'
import { PropertyType } from '@/core/types/properties'
import {
  canBePushed,
  prepareMutualDestroyActions,
  preparePushActions,
  prepareSingleDestroyActions,
  prepareWinActions
} from '@/core/things/actions'
import type { ThingController } from '@/core/controllers/thing'
import { store } from '@/core'

export const generalHandleEncounterMixin = async (subject: Thing, visitor: Thing, visitorFrom: Direction, thingController: ThingController): Promise<boolean> => {
  const result = true
  const ruleController = store.getRuleController()
  const mapController = store.getMapController()

  console.log('subject = ' + subject.name)
  console.log('visitor = ' + visitor.name)

  // get YOU property status
  const subjectIsYou = ruleController.$is(subject, PropertyType.YOU) || ruleController.$is(subject, PropertyType.YOU2)
  const visitorIsYou = ruleController.$is(visitor, PropertyType.YOU) || ruleController.$is(visitor, PropertyType.YOU2)

  // get FLOAT property status
  const subjectIsFloat = ruleController.$is(subject, PropertyType.FLOAT)
  const visitorIsFloat = ruleController.$is(visitor, PropertyType.FLOAT)

  const isSameFloatStatus = Boolean(subjectIsFloat === visitorIsFloat)

  // get WIN property status
  const subjectIsWin = ruleController.$is(subject, PropertyType.WIN)
  const visitorIsWin = ruleController.$is(visitor, PropertyType.WIN)

  // handle PUSH
  const subjectIsPush = ruleController.$is(subject, PropertyType.PUSH)
  console.log('subject is push = ' + subjectIsPush)
  if (subjectIsPush) {
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

  // handle WEAK
  const subjectIsWeak = ruleController.$is(subject, PropertyType.WEAK)
  const visitorIsWeak = ruleController.$is(visitor, PropertyType.WEAK)

  if (subjectIsWeak && visitorIsWeak) {
    await prepareMutualDestroyActions(subject, visitor, thingController)
    return result
  }
  if (subjectIsWeak) {
    await prepareSingleDestroyActions(subject, thingController)
    return result
  }
  if (visitorIsWeak) {
    await prepareSingleDestroyActions(visitor, thingController)
    return result
  }

  // handle STOP
  const subjectIsStop = subjectIsWeak ? false : ruleController.$is(subject, PropertyType.STOP)
  console.log('subject is stop = ' + subjectIsStop)
  if (subjectIsStop) return false

  // handle WIN
  if (isSameFloatStatus && !subjectIsStop && !subjectIsPush) {
    if ((subjectIsYou && subjectIsWin) || (visitorIsYou && visitorIsWin)) {
      console.log('win')
      prepareWinActions(subject, thingController)
      return result
    }
  }

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
  const subjectIsDefeat = ruleController.$is(subject, PropertyType.DEFEAT)
  const visitorIsDefeat = ruleController.$is(visitor, PropertyType.DEFEAT)

  if (isSameFloatStatus) {
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
  const subjectIsHot = ruleController.$is(subject, PropertyType.HOT)
  const visitorIsHot = ruleController.$is(visitor, PropertyType.HOT)
  const subjectIsMelt = ruleController.$is(subject, PropertyType.MELT)
  const visitorIsMelt = ruleController.$is(visitor, PropertyType.MELT)

  if (isSameFloatStatus) {
    if (subjectIsHot && visitorIsMelt) {
      await prepareSingleDestroyActions(visitor, thingController)
      return result
    }
    if (visitorIsHot && subjectIsMelt) {
      await prepareSingleDestroyActions(subject, thingController)
      return result
    }
  }

  // encounter empty block
  return result
}