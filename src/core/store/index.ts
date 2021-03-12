import {createServices} from "./services";
import {ContainerService} from './services/container'
import {CommandService, Command} from './services/command'
import {Container} from "pixi.js";

const createContainerStore = (containerService: ContainerService) => {
    return {
        getContainerByName: (name: string) => containerService.getContainerByName(name),
        getNonEmptyContainerByIndex: (index: number) => containerService.getNonEmptyContainerByIndex(index),
        getEmptyContainer: () => containerService.getEmptyContainer(),
        addContainer: (container: Container, name: string, index?: number) => containerService.addContainer(container, name, index),
        hasContainerById: (id: string) => containerService.hasContainerById(id),
        hasContainerByName: (name: string) => containerService.hasContainerByName(name),
        hasAnyContainer: () => containerService.hasAnyContainer(),
    }
}

const createCommandStore = (commandService: CommandService) => {
    return {
        nextCommand: () => commandService.nextCommand(),
        addCommand: (command: Command) => commandService.addCommand(command),
        clearCommand: () => commandService.clearCommand(),
        initCommandWatchService: () => commandService.initCommandWatchService(),
    }
}

export const createGameStore = () => {
    const services = createServices()

    const containerStore = createContainerStore(services.containerService)
    const commandStore = createCommandStore(services.commandService)

    return {
        ...containerStore,
        ...commandStore,
    }
}

export type GameStore = ReturnType<typeof createGameStore>
