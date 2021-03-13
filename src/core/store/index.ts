import {createServices} from './services';
import {ContainerService} from './services/container'
import {CommandService, Command} from './services/command'
import {SpriteService} from './services/sprite'
import {TextureService} from './services/texture'
import {Container, Sprite} from 'pixi.js';
import {ResourceMap} from '../resource';
import {Species} from '../resource';

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

export const createGameStore = () => {
    const services = createServices()

    const containerStore = createContainerStore(services.containerService)
    const commandStore = createCommandStore(services.commandService)
    const spriteStore = createSpriteStore(services.spriteService)
    const textureStore = createTextureStore(services.textureService)

    return {
        ...containerStore,
        ...commandStore,
        ...spriteStore,
        ...textureStore
    }
}

export type GameStore = ReturnType<typeof createGameStore>
