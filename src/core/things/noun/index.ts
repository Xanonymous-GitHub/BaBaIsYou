import {ThingCreator} from '../factory';
import {createTextBaba} from './textBaba';
import {createTextWall} from './textWall';
import {createTextFlag} from './textFlag';

const nouns: { [index: string]: ThingCreator } = {
    TextBaba: createTextBaba,
    TextWall: createTextWall,
    TextFlag: createTextFlag
}

export default nouns