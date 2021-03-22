import {IApplicationOptions} from 'pixi.js'

/**
 * @name appWidth
 * define the width of game canvas. (unit = px)
 * */
export const appWidth = 1320

/**
 * @name appHeight
 * define the Height of game canvas. (unit = px)
 * */
export const appHeight = 720

export const appOptions = {
    powerPreference: 'low-power', // when use production build, this should be set to 'high-performance'.
    width: appWidth,
    height: appHeight,
    autoDensity: true,
    preserveDrawingBuffer: true,
    antialias: true
} as IApplicationOptions

export const MAX_COMMAND_AMOUNT = 8
export const COMMAND_MIN_INTERVAL = 100

export const RESOURCE_ROOT_PATH = '/things/'