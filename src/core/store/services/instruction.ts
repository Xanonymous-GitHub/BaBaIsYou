import {Service} from './';

export interface InstructionService extends Service {
    init: () => void
}

// make a function called 'un-perform' for each instruction can implements the undo feature.