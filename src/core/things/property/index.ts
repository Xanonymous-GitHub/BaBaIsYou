import { ThingCreator } from '@/core/things/factory'
import { createTextStop } from './textStop'
import { createTextWin } from './textWin'
import { createTextYou } from './textYou'
import { createTextDefeat } from './textDefeat'
import { createTextPush } from './textPush'
import { createTextSink } from './textSink'
import { createTextHot } from './textHot'
import { createTextMelt } from './textMelt'

const properties: { [index: string]: ThingCreator } = {
  TextStop: createTextStop,
  TextWin: createTextWin,
  TextYou: createTextYou,
  TextDefeat: createTextDefeat,
  TextPush: createTextPush,
  TextSink: createTextSink,
  TextHot: createTextHot,
  TextMelt: createTextMelt
}

export default properties