import { ThingController } from '@/core/observer'

export const prepareWinActions = (thingController: ThingController) => {
  thingController.win()

  // DEBUG
  console.log('you win')
}