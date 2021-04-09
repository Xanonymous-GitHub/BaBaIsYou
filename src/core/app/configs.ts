import {IApplicationOptions} from 'pixi.js'
import {getBlockSize} from '../utils/screen';

const blockSize = getBlockSize()

/**
 * @name defaultAppWidth
 * define the width of game canvas. (unit = px)
 * */
export const defaultAppWidth = 33 * blockSize

/**
 * @name defaultAppHeight
 * define the Height of game canvas. (unit = px)
 * */
export const defaultAppHeight = 18 * blockSize

export const appOptions = {
    powerPreference: 'low-power', // when use production build, this should be set to 'high-performance'.
    width: defaultAppWidth,
    height: defaultAppHeight,
    autoDensity: true,
    preserveDrawingBuffer: true,
    antialias: true
} as IApplicationOptions

export const MAX_COMMAND_AMOUNT = 8
export const COMMAND_MIN_INTERVAL = 100

export const RESOURCE_ROOT_PATH = '/things/'