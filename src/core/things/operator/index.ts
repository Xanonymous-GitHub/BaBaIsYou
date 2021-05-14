import {ThingCreator} from '@/core/things/factory';
import {createTextIs} from './textIs';
import {createTextAnd} from './textAnd';

const operators: { [index: string]: ThingCreator } = {
    TextIs: createTextIs,
    TextAnd: createTextAnd
}

export default operators