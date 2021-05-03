import {ThingCreator} from '../factory';
import {createTextStop} from './textStop';
import {createTextWin} from './textWin';
import {createTextYou} from './textYou';

const properties: { [index: string]: ThingCreator } = {
    TextStop: createTextStop,
    TextWin: createTextWin,
    TextYou: createTextYou
}

export default properties