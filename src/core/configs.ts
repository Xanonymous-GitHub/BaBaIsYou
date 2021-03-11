import {IApplicationOptions} from 'pixi.js'

/**
 * @name appWidth
 * define the width of game canvas. (unit = px)
 * */
export const appWidth = 1080

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
