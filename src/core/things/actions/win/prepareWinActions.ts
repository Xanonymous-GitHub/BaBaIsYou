import { ThingController } from '@/core/controllers/thing'

export const prepareWinActions = (thingController: ThingController) => {
  thingController.win()

  // DEBUG
  console.log('you win')
}