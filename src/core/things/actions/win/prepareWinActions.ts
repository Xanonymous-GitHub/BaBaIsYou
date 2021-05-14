import {ThingController} from '@/core/observer';

export const prepareWinActions = (thingController: ThingController) => {
    thingController.stopDispatcher()

    // DEBUG
    console.log('you win')
}