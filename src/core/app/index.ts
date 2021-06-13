import { Application, utils, settings } from 'pixi.js'
import { appOptions } from './configs'

export const createGameApp = (): Application => {
  utils.skipHello()
  settings.GC_MODE = 0
  settings.SPRITE_MAX_TEXTURES = Math.min(settings.SPRITE_MAX_TEXTURES, 16)
  return new Application(appOptions)
}
