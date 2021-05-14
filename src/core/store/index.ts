import {createServices} from '@/core/store/services';
import {ContainerService} from '@/core/store/services/container'
import {CommandService, Command} from '@/core/store/services/command'
import {SpriteService} from '@/core/store/services/sprite'
import {TextureService} from '@/core/store/services/texture'
import {DispatchServerService} from '@/core/store/services/dispatchServer';
import {Application, Container, Sprite} from 'pixi.js';
import {ResourceMap} from '@/core/resource';
import {Species} from '@/core/resource';
import {InstructionDispatchServer} from '@/core/observer';
import {RuleController} from '@/core/observer/rule';
import {MapController} from '@/core/observer/map';
import {Edge, ScreenService} from '@/core/store/services/screen';
import {ScannerService} from '@/core/store/services/scanner';
import {RuleScanner} from '@/core/utils/ruleScanner';
import {BuilderService} from '@/core/store/services/builder';
import {StageController} from '@/core/builders/stage';
import {ContainerController} from '@/core/builders/container';
import {SpriteController} from '@/core/builders/sprite';

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

const createCommandStore = (commandService: CommandService) => {
    return {
        nextCommand: () => commandService.nextCommand(),
        addCommand: (command: Command) => commandService.addCommand(command),
        clearCommand: () => commandService.clearCommand(),
        initCommandWatchService: () => commandService.initCommandWatchService()
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

const createDispatchServerStore = (dispatchServerService: DispatchServerService) => {
    return {
        setDispatchServer: (server: InstructionDispatchServer) => dispatchServerService.setDispatchServer(server),
        getDispatchServer: () => dispatchServerService.getDispatchServer(),
        initDispatchServer: () => dispatchServerService.initDispatchServer(),
        disposeDispatchServer: () => dispatchServerService.disposeDispatchServer(),
        setRuleController: (controller: RuleController) => dispatchServerService.setRuleController(controller),
        setMapController: (controller: MapController) => dispatchServerService.setMapController(controller),
        getRuleController: () => dispatchServerService.getRuleController(),
        getMapController: () => dispatchServerService.getMapController(),
        changeMapSize: (mapEdge: Edge) => dispatchServerService.changeMapSize(mapEdge)
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
        setStageBuilder: (stageBuilder: StageController) => builderService.setStageBuilder(stageBuilder),
        setContainerBuilder: (containerBuilder: ContainerController) => builderService.setContainerBuilder(containerBuilder),
        setSpriteBuilder: (spriteBuilder: SpriteController) => builderService.setSpriteBuilder(spriteBuilder),
        getStageBuilder: () => builderService.getStageBuilder(),
        getContainerBuilder: () => builderService.getContainerBuilder(),
        getSpriteBuilder: () => builderService.getSpriteBuilder()
    }
}

export const createGameStore = () => {
    const services = createServices()

    const containerStore = createContainerStore(services.containerService)
    const commandStore = createCommandStore(services.commandService)
    const spriteStore = createSpriteStore(services.spriteService)
    const textureStore = createTextureStore(services.textureService)
    const dispatchServerStore = createDispatchServerStore(services.dispatchServerService)
    const screenStore = createScreenStore(services.screenService)
    const scannerStore = createScannerStore(services.scannerService)
    const builderStore = createBuilderStore(services.builderService)

    return {
        ...containerStore,
        ...commandStore,
        ...spriteStore,
        ...textureStore,
        ...dispatchServerStore,
        ...screenStore,
        ...scannerStore,
        ...builderStore
    }
}

export type GameStore = ReturnType<typeof createGameStore>
