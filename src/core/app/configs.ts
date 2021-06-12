import { IApplicationOptions } from 'pixi.js'
import { getBlockSize } from '@/core/app/screen'

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
  powerPreference: 'high-performance',
  width: defaultAppWidth,
  height: defaultAppHeight,
  autoDensity: true,
  preserveDrawingBuffer: true,
  antialias: true
} as IApplicationOptions

export const MAX_COMMAND_AMOUNT = 8
export const COMMAND_MIN_INTERVAL = 100
export const THING_MOVE_DURATION = 80

export const RESOURCE_ROOT_PATH = '/things/'