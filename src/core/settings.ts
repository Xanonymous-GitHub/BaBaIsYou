import {IApplicationOptions} from 'pixi.js'

/**
 * @name appWidth
 * define the width of game canvas. (unit = px)
 * */
export const appWidth = 900

/**
 * @name appHeight
 * define the Height of game canvas. (unit = px)
 * */
export const appHeight = 600

export const appOptions = {
  powerPreference: 'high-performance',
  // resizeTo: document.querySelector('#app') as HTMLDivElement
  width: appWidth,
  height: appHeight,
} as IApplicationOptions
