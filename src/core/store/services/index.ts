import { createContainerService } from './container'
import { createCommandService } from './command'
import { createSpriteService } from './sprite'
import { createTextureService } from './texture'
import { createDispatchServerService } from './dispatchServer'
import { createScreenService } from './screen'
import { createScannerService } from './scanner'
import { createBuilderService } from './builder'

export const createServices = () => {
  const containerService = createContainerService()
  const commandService = createCommandService()
  const spriteService = createSpriteService()
  const textureService = createTextureService()
  const dispatchServerService = createDispatchServerService()
  const screenService = createScreenService()
  const scannerService = createScannerService()
  const builderService = createBuilderService()

  return {
    containerService,
    commandService,
    spriteService,
    textureService,
    dispatchServerService,
    screenService,
    scannerService,
    builderService
  }
}