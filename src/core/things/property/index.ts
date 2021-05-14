import {ThingCreator} from '@/core/things/factory';
import {createTextStop} from './textStop';
import {createTextWin} from './textWin';
import {createTextYou} from './textYou';
import {createTextDefeat} from './textDefeat';
import {createTextPush} from './textPush';
import {createTextSink} from './textSink';
const properties: { [index: string]: ThingCreator } = {
    TextStop: createTextStop,
    TextWin: createTextWin,
    TextYou: createTextYou,
    TextDefeat: createTextDefeat,
    TextPush: createTextPush,
    TextSink: createTextSink
}

export default properties