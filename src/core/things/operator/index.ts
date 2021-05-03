import {ThingCreator} from '../factory';
import {createTextIs} from './textIs';

const operators: { [index: string]: ThingCreator } = {
    TextIs: createTextIs
}

export default operators