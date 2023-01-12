import { Application, BatchRenderer, GC_MODES, settings, TextureGCSystem } from 'pixi.js'
import { appOptions } from './configs'

export const createGameApp = (): Application => {
  settings.RENDER_OPTIONS.hello = false
  TextureGCSystem.defaultMode = GC_MODES.AUTO
  BatchRenderer.defaultBatchSize = Math.min(BatchRenderer.defaultBatchSize, 16)
  return new Application(appOptions)
}
