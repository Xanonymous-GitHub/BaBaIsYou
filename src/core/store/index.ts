import { createServices } from '@/core/store/services'
import { ContainerService } from '@/core/store/services/container'
import { CommandService, Command } from '@/core/store/services/command'
import { SpriteService } from '@/core/store/services/sprite'
import { TextureService } from '@/core/store/services/texture'
import { ControllerService } from '@/core/store/services/controllers'
import { Application, Container, Sprite } from 'pixi.js'
import { ResourceMap } from '@/core/resource'
import { Species } from '@/core/resource'
import { InstructionDispatchServer } from '@/core/controllers/dispatcher'
import { RuleController } from '@/core/controllers/rule'
import { MapController } from '@/core/controllers/map'
import { Edge, ScreenService } from '@/core/store/services/screen'
import { ScannerService } from '@/core/store/services/scanner'
import { RuleScanner } from '@/core/controllers/tools/ruleScanner'
import { BuilderService } from '@/core/store/services/builder'
import { StageBuilderConcrete } from '@/core/builders/stage'
import { ContainerBuilderConcrete } from '@/core/builders/container'
import { SpriteBuilderConcrete } from '@/core/builders/sprite'
import { Observer } from '@/core/observer/observer'

const createContainerStore = (containerService: ContainerService) => {
  return {
    getContainerByName: (name: string) => containerService.getContainerByName(name),
    getNonEmptyContainerByIndex: (index: number) => containerService.getNonEmptyContainerByIndex(index),
    getEmptyContainer: () => containerService.getEmptyContainer(),
    addContainer: (container: Container, name: string, index?: number) => containerService.addContainer(container, name, index),
    hasContainerById: (id: string) => containerService.hasContainerById(id),
    hasContainerByName: (name: string) => containerService.hasContainerByName(name),
    hasAnyContainer: () => containerService.hasAnyContainer()
  }
}

const createSpriteStore = (spriteService: SpriteService) => {
  return {
    getSpriteByName: (name: string) => spriteService.getSpriteByName(name),
    getSpritesByName: (name: string, amount: number) => spriteService.getSpritesByName(name, amount),
    getSpriteAmountByName: (name: string) => spriteService.getSpriteAmountByName(name),
    addSpriteByName: (name: string, sprite: Sprite) => spriteService.addSpriteByName(name, sprite),
    addSpritesByName: (name: string, sprites: Array<Sprite>) => spriteService.addSpritesByName(name, sprites)
  }
}

const createTextureStore = (textureService: TextureService) => {
  return {
    addResourceMap: (resourceMap: ResourceMap) => textureService.addResourceMap(resourceMap),
    loadResourcesByName: (species: Species, names: Array<string>) => textureService.loadResourcesByName(species, names),
    getLoadingProgress: () => textureService.getLoadingProgress(),
    getTextureByName: (name: string) => textureService.getTextureByName(name)
  }
}

const createControllerStore = (ControllerService: ControllerService) => {
  return {
    setDispatchServer: (server: InstructionDispatchServer) => ControllerService.setDispatchServer(server),
    getDispatchServer: () => ControllerService.getDispatchServer(),
    initDispatchServer: () => ControllerService.initDispatchServer(),
    disposeDispatchServer: () => ControllerService.disposeDispatchServer(),
    setRuleController: (controller: RuleController) => ControllerService.setRuleController(controller),
    setMapController: (controller: MapController) => ControllerService.setMapController(controller),
    getRuleController: () => ControllerService.getRuleController(),
    getMapController: () => ControllerService.getMapController(),
    changeMapSize: (mapEdge: Edge) => ControllerService.changeMapSize(mapEdge)
  }
}

const createCommandStore = (commandService: CommandService) => {
  return {
    nextCommand: () => commandService.nextCommand(),
    addCommand: (command: Command) => commandService.addCommand(command),
    clearCommand: () => commandService.clearCommand(),
    initCommandWatchService: () => commandService.initCommandWatchService(),
    connectDispatchListener: (listener: Observer) => commandService.connectDispatchListener(listener)
  }
}

const createScreenStore = (screenService: ScreenService) => {
  return {
    setAppSize: (width: number, height: number) => screenService.setAppSize(width, height),
    getAppEdge: () => screenService.getAppEdge(),
    bindAppToScreenService: (app: Application) => screenService.bindAppToScreenService(app)
  }
}

const createScannerStore = (scannerService: ScannerService) => {
  return {
    setScanner: (scanner: RuleScanner) => scannerService.setScanner(scanner),
    getScanner: () => scannerService.getScanner()
  }
}

const createBuilderStore = (builderService: BuilderService) => {
  return {
    setStageBuilder: (stageBuilder: StageBuilderConcrete) => builderService.setStageBuilder(stageBuilder),
    setContainerBuilder: (containerBuilder: ContainerBuilderConcrete) => builderService.setContainerBuilder(containerBuilder),
    setSpriteBuilder: (spriteBuilder: SpriteBuilderConcrete) => builderService.setSpriteBuilder(spriteBuilder),
    getStageBuilder: () => builderService.getStageBuilder(),
    getContainerBuilder: () => builderService.getContainerBuilder(),
    getSpriteBuilder: () => builderService.getSpriteBuilder()
  }
}

export const createGameStore = () => {
  const services = createServices()

  const containerStore = createContainerStore(services.containerService)
  const spriteStore = createSpriteStore(services.spriteService)
  const textureStore = createTextureStore(services.textureService)
  const controllerStore = createControllerStore(services.controllerService)
  const commandStore = createCommandStore(services.commandService)
  const screenStore = createScreenStore(services.screenService)
  const scannerStore = createScannerStore(services.scannerService)
  const builderStore = createBuilderStore(services.builderService)

  return {
    ...containerStore,
    ...commandStore,
    ...spriteStore,
    ...textureStore,
    ...controllerStore,
    ...screenStore,
    ...scannerStore,
    ...builderStore
  }
}

export type GameStore = ReturnType<typeof createGameStore>
