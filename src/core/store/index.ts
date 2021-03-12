import {createServices} from "./services";
import {ContainerService} from './services/container'
import {CommandService, Command} from './services/command'
import {Container} from "pixi.js";

const createContainerStore = (containerService: ContainerService) => {
    return {
        getContainerByName: (name: string) => containerService.getContainerByName(name),
        getContainerByIndex: (index: number) => containerService.getContainerByIndex(index),
        getContainerById: (id: string) => containerService.getContainerById(id),
        addContainer: (container: Container, name: string, index?: number) => containerService.addContainer(container, name, index),
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

export type GameStore = typeof createGameStore
