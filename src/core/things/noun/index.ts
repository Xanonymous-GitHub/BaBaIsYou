import {ThingCreator} from '@/core/things/factory';
import {createTextBaba} from './textBaba';
import {createTextWall} from './textWall';
import {createTextFlag} from './textFlag';
import {createTextCrab} from './textCrab';
import {createTextSkull} from './textSkull';
import {createTextStar} from './textStar';
import {createTextRock} from './textRock';
import {createTextWater} from './textWater';

const nouns: { [index: string]: ThingCreator } = {
    TextBaba: createTextBaba,
    TextWall: createTextWall,
    TextFlag: createTextFlag,
    TextCrab: createTextCrab,
    TextSkull: createTextSkull,
    TextStar: createTextStar,
    TextRock: createTextRock,
    TextWater: createTextWater
}

export default nouns