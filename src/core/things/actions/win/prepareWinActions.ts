// import {Thing} from '../../../things';
import {ThingController} from '../../../observer';

export const prepareWinActions = (thingController: ThingController) => {
    thingController.stopDispatcher()

    // DEBUG
    console.log('you win')
}